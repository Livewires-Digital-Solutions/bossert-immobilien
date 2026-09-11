/**
 * onOffice API Client — HMAC v2 Authentication
 *
 * Key facts (confirmed by testing):
 *  - HMAC v2 = SHA256(timestamp + token + resourcetype + actionid), Base64
 *  - Each request must contain only ONE action (multi-action batches → error 141)
 *  - Estate read: resourcetype="estate", actionid="...action:read", resourceid="" for search, or <internalId>
 *  - Photos:      resourcetype="estatepictures", actionid="...action:get", resourceid=0
 *  - The local machine clock is ~258 s ahead of onOffice servers; we compensate by
 *    using ONOFFICE_TS_OFFSET_S (default 270) to subtract from Date.now()
 */

import crypto from 'crypto';
import { Property, mockProperties } from '@/data/properties';
import { isBackendEnabled } from '@/lib/backend-config';
import { ESTATE_FIELD_DICTIONARY, humaniseFieldKey } from '@/lib/onoffice-fields';

// ─── Config ──────────────────────────────────────────────────────────────────
const TOKEN   = process.env.ONOFFICE_TOKEN      ?? '';
const SECRET  = process.env.ONOFFICE_SECRET     ?? '';
const API_URL = process.env.ONOFFICE_API_URL    ?? 'https://api.onoffice.de/api/latest/api.php';
const TS_OFFSET = parseInt(process.env.ONOFFICE_TS_OFFSET_S ?? '270', 10);

const ACTION_READ = 'urn:onoffice-de-ns:smart:2.5:smartml:action:read';
const ACTION_GET  = 'urn:onoffice-de-ns:smart:2.5:smartml:action:get';

const ESTATE_FIELDS = [
  'Id', 'objekttitel', 'vermarktungsart', 'objektart',
  'kaufpreis', 'kaltmiete', 'warmmiete',
  'ort', 'plz', 'strasse', 'lage',
  'wohnflaeche', 'nutzflaeche', 'grundstuecksflaeche',
  'anzahl_zimmer', 'anzahl_schlafzimmer', 'anzahl_badezimmer',
  'baujahr', 'zustand',
  'heizungsart', 'befeuerung', 'energieausweistyp', 'energieverbrauchskennwert', 'endenergiebedarf', 'energieausweisBaujahr', 'energietraeger',
  'aussen_courtage', 'provisionshinweis',
  'objektbeschreibung', 'ausstattungExpose',
  'breitengrad', 'laengengrad', 'objektnr_extern',
];

/**
 * Additional standard onOffice estate fields requested when the live field
 * catalogue is unavailable. Kept conservative — an unknown key rejects the whole
 * read (we retry with ESTATE_FIELDS), but these are all part of onOffice's
 * documented default estate schema.
 */
const SAFE_EXTRA_ESTATE_FIELDS = [
  'objektnr_intern', 'nutzungsart', 'objektkategorie', 'verfuegbar_ab', 'status', 'vermietet',
  'nettokaltmiete', 'nebenkosten', 'heizkosten', 'hausgeld', 'kaution',
  'provisionspflichtig', 'innen_courtage', 'waehrung',
  'gesamtflaeche', 'kellerflaeche', 'gartenflaeche', 'bueroflaeche', 'lagerflaeche',
  'anzahl_balkone', 'anzahl_etagen', 'etage', 'anzahl_stellplaetze', 'anzahl_wohneinheiten',
  'objektzustand', 'baujahr', 'letzte_modernisierung', 'bauweise', 'denkmalschutz',
  'moebliert', 'aufzug', 'keller', 'ausstattung',
  'energieeffizienzklasse', 'primaerenergietraeger', 'warmwasserversorgung',
  'ortsteil', 'regionaler_zusatz', 'bundesland', 'land',
  'lage_beschreibung', 'sonstige_angaben',
];

// ─── HMAC Generation ─────────────────────────────────────────────────────────

function generateHmac(
  secret:       string,
  timestamp:    string,
  token:        string,
  resourcetype: string,
  actionid:     string,
): string {
  const message = timestamp + token + resourcetype + actionid;
  return crypto.createHmac('sha256', secret).update(message).digest('base64');
}

function getTimestamp(): number {
  return Math.floor(Date.now() / 1000) - TS_OFFSET;
}

// ─── Core Request ─────────────────────────────────────────────────────────────

interface OnOfficeAction {
  actionid:     string;
  resourcetype: string;
  resourceid?:  number | string;
  identifier?:  string;
  parameters:   Record<string, unknown>;
  timeoutMs?:   number;
}

async function callOnOffice(action: OnOfficeAction): Promise<unknown> {
  if (!TOKEN || !SECRET) {
    return null;
  }
  const ts        = getTimestamp();
  const timestamp = ts.toString();
  const hmac      = generateHmac(SECRET, timestamp, TOKEN, action.resourcetype, action.actionid);

  const body = {
    token: TOKEN,
    request: {
      actions: [
        {
          actionid:     action.actionid,
          resourceid:   action.resourceid !== undefined ? action.resourceid : '',
          identifier:   action.identifier ?? 'req',
          timestamp:    ts,
          hmac,
          hmac_version: '2',
          resourcetype: action.resourcetype,
          cacheable:    0,
          parameters:   action.parameters,
        },
      ],
    },
  };

  const response = await fetch(API_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
    cache:   'no-store',
    signal:  AbortSignal.timeout(action.timeoutMs ?? 10000),
  });

  if (!response.ok) {
    throw new Error(`onOffice HTTP ${response.status}: ${response.statusText}`);
  }

  const json = (await response.json()) as {
    status:   { code: number; message: string };
    response: {
      results: Array<{
        data:   unknown;
        status: { errorcode: number; message: string };
      }>;
    };
  };

  if (json.status?.code !== 200) {
    throw new Error(`onOffice outer status ${json.status?.code}: ${json.status?.message}`);
  }

  const result = json.response.results[0];
  if (!result) {
    throw new Error('onOffice returned no results');
  }
  if (result.status?.errorcode !== 0) {
    throw new Error(
      `onOffice action error ${result.status.errorcode}: ${result.status.message}`,
    );
  }

  return result.data;
}

// ─── Photo Fetcher ────────────────────────────────────────────────────────────

async function fetchEstatePhotos(estateId: number): Promise<string[]> {
  try {
    const data = (await callOnOffice({
      actionid:     ACTION_GET,
      resourcetype: 'estatepictures',
      resourceid:   0,
      identifier:   `pics-${estateId}`,
      parameters: {
        estateids:  [estateId],
        categories: ['Foto'],
        language:   'DEU',
      },
    })) as { records: Array<{ elements: Array<{ url?: string }> }> };

    const urls: string[] = [];
    for (const record of data?.records ?? []) {
      for (const el of Array.isArray(record.elements) ? record.elements : []) {
        if (el.url) urls.push(el.url);
      }
    }
    return urls;
  } catch (err) {
    console.warn(`[onoffice] Photos for estate ${estateId} failed:`, err);
    return [];
  }
}

// ─── Field Mapper ─────────────────────────────────────────────────────────────

function formatPrice(raw: unknown): string {
  const num = parseFloat(String(raw ?? '0').replace(/[^\d.]/g, ''));
  if (isNaN(num) || num === 0) return 'Preis auf Anfrage';
  return `€ ${num.toLocaleString('de-DE', { maximumFractionDigits: 0 })}`;
}

function buildSpecs(el: Record<string, unknown>): string {
  const parts: string[] = [];

  const rooms = el['anzahl_zimmer'];
  if (rooms) {
    const n = parseFloat(String(rooms));
    if (!isNaN(n) && n > 0) {
      parts.push(`${Number.isInteger(n) ? n : n.toLocaleString('de-DE')} Zimmer`);
    }
  }

  const area = el['wohnflaeche'] ?? el['nutzflaeche'];
  if (area) {
    const n = parseFloat(String(area));
    if (!isNaN(n) && n > 0) parts.push(`${n.toLocaleString('de-DE')} m²`);
  }

  const plot = el['grundstuecksflaeche'];
  if (plot) {
    const n = parseFloat(String(plot));
    if (!isNaN(n) && n > 0) parts.push(`${n.toLocaleString('de-DE')} m² Grundstück`);
  }

  return parts.join(' • ');
}

function mapEstateToProperty(
  record: { id: number; elements: Record<string, unknown> },
  photos: string[],
): Property {
  const el = record.elements;

  const externalId = (el['objektnr_extern'] as string) || String(record.id);
  const title    = (el['objekttitel'] as string) || (el['objektart'] as string) || 'Immobilie';
  const location = [el['strasse'], el['plz'], el['ort']]
    .filter(Boolean).join(', ') || (el['lage'] as string) || 'Deutschland';
  const price    = formatPrice(el['kaufpreis'] ?? el['kaltmiete'] ?? el['warmmiete']);
  const specs    = buildSpecs(el);

  const description =
    (el['objektbeschreibung'] as string) || (el['freitext_1'] as string) || '';

  const amenityRaw = (el['ausstattungExpose'] as string) || (el['ausstattungsbeschreibung'] as string) || '';
  const amenities  = amenityRaw.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);

  const livingArea = el['wohnflaeche'] ? `${parseFloat(String(el['wohnflaeche'])).toLocaleString('de-DE')} m²` : undefined;
  const plotArea = el['grundstuecksflaeche'] ? `${parseFloat(String(el['grundstuecksflaeche'])).toLocaleString('de-DE')} m²` : undefined;
  const roomsStr = el['anzahl_zimmer'] ? String(el['anzahl_zimmer']) : undefined;
  const bedroomsStr = el['anzahl_schlafzimmer'] ? String(el['anzahl_schlafzimmer']) : undefined;
  const bathroomsStr = el['anzahl_badezimmer'] ? String(el['anzahl_badezimmer']) : undefined;
  const buildYear = el['baujahr'] ? String(el['baujahr']) : undefined;
  const condition = el['zustand'] ? String(el['zustand']) : undefined;

  const heatingType = el['heizungsart'] ? String(el['heizungsart']) : undefined;
  const firing = el['befeuerung'] ? String(el['befeuerung']) : (el['energietraeger'] ? String(el['energietraeger']) : undefined);
  const energyPassType = el['energieausweistyp'] ? String(el['energieausweistyp']) : undefined;
  const energyConsumption = el['endenergiebedarf'] ? String(el['endenergiebedarf']) : (el['energieverbrauchskennwert'] ? String(el['energieverbrauchskennwert']) : undefined);

  const commission = el['aussen_courtage'] ? String(el['aussen_courtage']) : (el['provisionshinweis'] ? String(el['provisionshinweis']) : undefined);

  return {
    id:            externalId,
    imageSrc:      photos[0] ?? '/images/prop_apartment_new.jpg',
    type:          title,
    price,
    location,
    specs,
    featured:      true,
    galleryImages: photos.length > 0 ? photos : undefined,
    description:   description || undefined,
    amenities:     amenities.length > 0 ? amenities : undefined,
    livingArea,
    plotArea,
    rooms: roomsStr,
    bedrooms: bedroomsStr,
    bathrooms: bathroomsStr,
    buildYear,
    condition,
    energy: (heatingType || firing || energyPassType || energyConsumption) ? {
      heatingType,
      firing,
      energyPassType,
      energyConsumption,
    } : undefined,
    commission,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** 
 * Fetch all properties assigned to benutzer: "25". 
 * This dynamically retrieves all properties instead of using hardcoded IDs.
 */
export async function fetchOnOfficeProperties(): Promise<Property[]> {
  if (!isBackendEnabled()) {
    return mockProperties;
  }
  
  if (!TOKEN || !SECRET) {
    return [];
  }
  
  try {
    const data = (await callOnOffice({
      actionid:     ACTION_READ,
      resourcetype: 'estate',
      resourceid:   '', // Empty string for search action
      identifier:   'estate-search',
      parameters:   { 
        data: ESTATE_FIELDS,
        searchdata: { benutzer: 25 },
        listlimit: 50 // Fetch up to 50 matching properties
      },
    })) as { records: Array<{ id: number; elements: Record<string, unknown> }> };

    const records = data?.records ?? [];
    const properties: Property[] = [];

    // Process properties (we can do it sequentially to avoid hammering the API, or in small batches)
    for (const record of records) {
      const photos = await fetchEstatePhotos(record.id);
      properties.push(mapEstateToProperty(record, photos));
    }

    return properties;
  } catch (err) {
    console.error('[onoffice] fetchOnOfficeProperties error:', err);
    return [];
  }
}

/** Fetch a single property by its external ID (URL slug). */
export async function fetchOnOfficePropertyById(
  externalId: string,
): Promise<Property | null> {
  if (!isBackendEnabled()) {
    return mockProperties.find(p => p.id === externalId) || mockProperties[0];
  }

  if (!TOKEN || !SECRET) {
    return null;
  }

  try {
    const data = (await callOnOffice({
      actionid:     ACTION_READ,
      resourcetype: 'estate',
      resourceid:   '', // Empty string for search
      identifier:   `estate-get-${externalId}`,
      parameters:   { 
        data: ESTATE_FIELDS,
        searchdata: { objektnr_extern: externalId }
      },
    })) as { records: Array<{ id: number; elements: Record<string, unknown> }> };

    const record = data?.records?.[0];
    if (!record) return null;

    const photos = await fetchEstatePhotos(record.id);
    const property = mapEstateToProperty(record, photos);

    // Map GPS coordinates if present
    const lat = parseFloat(String(record.elements['breitengrad'] ?? ''));
    const lng = parseFloat(String(record.elements['laengengrad']  ?? ''));
    if (!isNaN(lat) && !isNaN(lng)) {
      property.locationData = { coordinates: [lat, lng] };
    }

    return property;
  } catch (err) {
    console.error(`[onoffice] fetchOnOfficePropertyById(${externalId}) error:`, err);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN INTEGRATION — full field catalogue + complete estate snapshot
//
// Used by /admin/properties to let an admin import an estate by its onOffice
// Internal ID (estate `Id`) or External ID (`objektnr_extern`), inspect every
// field the API returns, and choose per-field what the public site may show.
// ─────────────────────────────────────────────────────────────────────────────

/** True when onOffice credentials are configured. */
export function hasOnOfficeCredentials(): boolean {
  return Boolean(TOKEN && SECRET);
}

export interface OnOfficeFieldMeta {
  key: string;
  label: string;
  type: string;
  /** value-key → human label, for single/multi-select fields */
  permittedValues?: Record<string, string>;
}

export interface OnOfficeFieldValue {
  key: string;
  label: string;
  /** Display-resolved value (select labels applied, booleans humanised). */
  value: string;
  section: string;
  type: string;
}

export interface OnOfficeEstateSnapshot {
  internalId: string;
  externalId: string | null;
  title: string | null;
  marketingType: string | null;
  objectType: string | null;
  priceLabel: string | null;
  city: string | null;
  heroImage: string | null;
  images: string[];
  /** Every non-empty field the API returned, grouped + ordered. */
  fields: OnOfficeFieldValue[];
  /** Untouched `elements` map from onOffice, for storage / debugging. */
  raw: Record<string, unknown>;
  /** Field keys confirmed valid for this account — cache and reuse as the fast path. */
  discoveredKeys: string[];
}

// ── Section routing ──────────────────────────────────────────────────────────

const SECTION_ORDER = [
  'Overview',
  'Price',
  'Areas',
  'Rooms',
  'Building',
  'Energy',
  'Location',
  'Description',
  'Other',
] as const;

function sectionFor(key: string): string {
  const k = key.toLowerCase();
  const has = (...needles: string[]) => needles.some((n) => k.includes(n));

  if (has('energie', 'heizung', 'befeuerung', 'energieausweis', 'endenergie', 'primaerenergie', 'co2', 'energietraeger'))
    return 'Energy';
  if (has('kaufpreis', 'miete', 'preis', 'kosten', 'kaution', 'provision', 'courtage', 'hausgeld', 'pacht', 'waehrung'))
    return 'Price';
  if (has('flaeche', 'flache', 'wohnflaeche', 'nutzflaeche', 'grundstueck'))
    return 'Areas';
  if (has('zimmer', 'schlafzimmer', 'badezimmer', 'balkon', 'etage', 'anzahl_'))
    return 'Rooms';
  if (has('baujahr', 'zustand', 'ausstattung', 'bauweise', 'denkmal', 'modernisier', 'objektzustand'))
    return 'Building';
  if (has('ort', 'plz', 'strasse', 'hausnummer', 'land', 'region', 'lage', 'breitengrad', 'laengengrad', 'bundesland'))
    return 'Location';
  if (has('beschreibung', 'freitext', 'text', 'sonstige_angaben', 'objekttext'))
    return 'Description';
  if (has('objekttitel', 'objektart', 'vermarktungsart', 'objektnr', 'nutzungsart', 'status', 'verfuegbar', 'objektkategorie'))
    return 'Overview';
  return 'Other';
}

// ── onOffice calls ───────────────────────────────────────────────────────────

type CatalogMap = Map<string, OnOfficeFieldMeta>;

let catalogCache: { at: number; map: CatalogMap } | null = null;
const CATALOG_TTL_MS = 24 * 60 * 60 * 1000;

/** Serialise a catalog map for persistence. */
export function serialiseCatalog(map: CatalogMap): Record<string, OnOfficeFieldMeta> {
  return Object.fromEntries(map);
}

/** Rebuild a catalog map from persisted JSON. */
export function deserialiseCatalog(obj: Record<string, OnOfficeFieldMeta> | null | undefined): CatalogMap {
  const map: CatalogMap = new Map();
  for (const [k, v] of Object.entries(obj ?? {})) map.set(k, v);
  return map;
}

/**
 * Fetch the full estate field catalogue (keys, labels, select options).
 * The `fields` endpoint is slow (20–60 s), so results are cached in-process for
 * 24 h. Throws on network / timeout — callers should fall back gracefully.
 */
export async function fetchEstateFieldCatalog(
  { timeoutMs = 45000, force = false }: { timeoutMs?: number; force?: boolean } = {},
): Promise<CatalogMap> {
  const out: CatalogMap = new Map();
  if (!hasOnOfficeCredentials()) return out;

  if (!force && catalogCache && Date.now() - catalogCache.at < CATALOG_TTL_MS) {
    return catalogCache.map;
  }

  const data = (await callOnOffice({
    actionid: ACTION_GET,
    resourcetype: 'fields',
    resourceid: '',
    identifier: 'estate-field-catalog',
    parameters: { labels: true, language: 'DEU', modules: ['estate'] },
    timeoutMs,
  })) as { records?: Array<{ elements?: Record<string, unknown> }> } | null;

  for (const record of data?.records ?? []) {
    const elements = record.elements ?? {};
    for (const [key, metaRaw] of Object.entries(elements)) {
      if (!metaRaw || typeof metaRaw !== 'object') continue;
      const meta = metaRaw as Record<string, unknown>;
      // Skip catalogue housekeeping entries.
      if (key === 'label' || typeof meta['type'] !== 'string') continue;

      let permittedValues: Record<string, string> | undefined;
      const pv = meta['permittedvalues'];
      if (pv && typeof pv === 'object') {
        permittedValues = {};
        for (const [vk, vl] of Object.entries(pv as Record<string, unknown>)) {
          permittedValues[vk] = String(vl);
        }
      }

      out.set(key, {
        key,
        label: typeof meta['label'] === 'string' && meta['label'] ? (meta['label'] as string) : key,
        type: meta['type'] as string,
        permittedValues,
      });
    }
  }

  if (out.size > 0) catalogCache = { at: Date.now(), map: out };
  return out;
}

/** Seed the in-process catalog cache from a persisted copy (e.g. DB). */
export function primeCatalogCache(map: CatalogMap): void {
  if (map.size > 0) catalogCache = { at: Date.now(), map };
}

function resolveValue(raw: unknown, meta: OnOfficeFieldMeta | undefined): string {
  if (raw === null || raw === undefined) return '';
  if (Array.isArray(raw)) {
    return raw
      .map((v) => resolveValue(v, meta))
      .filter(Boolean)
      .join(', ');
  }
  const s = String(raw).trim();
  if (!s) return '';

  const type = meta?.type ?? '';
  if (type === 'boolean' || s === 'true' || s === 'false') {
    if (s === '1' || s === 'true') return 'Yes';
    if (s === '0' || s === 'false') return 'No';
  }
  if (meta?.permittedValues) {
    if (meta.permittedValues[s]) return meta.permittedValues[s];
    // multi-select comes back comma/pipe separated
    const parts = s.split(/[,|]/).map((p) => p.trim());
    if (parts.length > 1) {
      const mapped = parts.map((p) => meta.permittedValues![p] ?? p);
      return mapped.join(', ');
    }
  }
  return s;
}

function labelFor(key: string, meta: OnOfficeFieldMeta | undefined): string {
  if (meta?.label && meta.label !== key) return meta.label;
  const dict = ESTATE_FIELD_DICTIONARY[key];
  if (dict) return dict.label;
  return humaniseFieldKey(key);
}

function sectionForKey(key: string): string {
  return ESTATE_FIELD_DICTIONARY[key]?.section ?? sectionFor(key);
}

/**
 * Fetch a complete estate snapshot by Internal ID (preferred) or External ID.
 * Returns every non-empty field the API exposes, grouped into sections.
 *
 * Pass a pre-loaded `catalog` (from a cached copy) to avoid the slow live
 * `fields` call; when omitted, a best-effort live fetch is attempted and any
 * failure falls back to the static field dictionary.
 */
const UNKNOWN_FIELD_RE = /unknown field/i;
const TRANSIENT_RE = /fetch failed|ECONNRESET|timeout|aborted|network|socket hang up|EAI_AGAIN/i;

async function withRetry<T>(fn: () => Promise<T>, tries = 3): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      if (UNKNOWN_FIELD_RE.test(msg) || !TRANSIENT_RE.test(msg)) throw err;
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
  throw lastErr;
}

interface EstateRecord {
  id: number;
  elements: Record<string, unknown>;
}

export async function fetchEstateSnapshot(
  opts: { internalId?: string | null; externalId?: string | null },
  cfg: { catalog?: CatalogMap; validKeys?: string[] | null } = {},
): Promise<OnOfficeEstateSnapshot | null> {
  if (!hasOnOfficeCredentials()) {
    throw new Error('onOffice credentials are not configured (ONOFFICE_TOKEN / ONOFFICE_SECRET).');
  }

  const internalId = opts.internalId?.trim() || '';
  const externalId = opts.externalId?.trim() || '';
  if (!internalId && !externalId) {
    throw new Error('Provide an Internal ID or an External ID.');
  }

  const cat: CatalogMap = cfg.catalog ?? new Map();
  const searchdata = internalId ? undefined : { objektnr_extern: externalId };
  const resourceid = internalId || '';

  const readChunk = (dataFields: string[]) =>
    withRetry(async () => {
      const res = (await callOnOffice({
        actionid: ACTION_READ,
        resourcetype: 'estate',
        resourceid,
        identifier: `estate-snapshot-${internalId || externalId}`,
        parameters: searchdata ? { data: dataFields, searchdata } : { data: dataFields },
        timeoutMs: 30000,
      })) as { records?: EstateRecord[] } | null;
      return res?.records?.[0] ?? null;
    });

  // Candidate keys: cached-valid list (fast path), else catalogue ∪ curated ∪ dictionary.
  const candidates =
    cfg.validKeys && cfg.validKeys.length
      ? Array.from(new Set<string>([...cfg.validKeys, ...ESTATE_FIELDS]))
      : Array.from(
          new Set<string>([
            ...cat.keys(),
            ...ESTATE_FIELDS,
            ...SAFE_EXTRA_ESTATE_FIELDS,
            ...Object.keys(ESTATE_FIELD_DICTIONARY),
          ]),
        );

  const merged: Record<string, unknown> = {};
  const validKeys: string[] = [];
  let recordId = internalId ? Number(internalId) : 0;

  // Photos live on a separate endpoint — start that request now when we already
  // know the internal id, so it overlaps the field reads instead of following them.
  const photosEarly =
    internalId && !Number.isNaN(Number(internalId)) ? fetchEstatePhotos(Number(internalId)) : null;

  // Read the candidate fields in small chunks, all concurrently. onOffice rejects
  // a whole read for one unknown key, so bisect any chunk it refuses.
  const CHUNK_SIZE = 25;
  const initialChunks: string[][] = [];
  for (let i = 0; i < candidates.length; i += CHUNK_SIZE) {
    initialChunks.push(candidates.slice(i, i + CHUNK_SIZE));
  }

  async function readGroup(chunk: string[]): Promise<void> {
    let rec: EstateRecord | null;
    try {
      rec = await readChunk(chunk);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (UNKNOWN_FIELD_RE.test(msg) && chunk.length > 1) {
        const mid = Math.ceil(chunk.length / 2);
        await Promise.all([readGroup(chunk.slice(0, mid)), readGroup(chunk.slice(mid))]);
        return;
      }
      if (UNKNOWN_FIELD_RE.test(msg)) return; // single bad key — drop it
      throw err;
    }
    if (rec) {
      if (rec.id) recordId = rec.id;
      Object.assign(merged, rec.elements ?? {});
      validKeys.push(...chunk);
    }
  }

  await Promise.all(initialChunks.map(readGroup));

  if (validKeys.length === 0) return null;

  const el = merged;
  const resolvedInternalId = String(recordId || internalId);
  const photos = photosEarly ? await photosEarly : await fetchEstatePhotos(recordId);

  const fields: OnOfficeFieldValue[] = [];
  for (const [key, rawVal] of Object.entries(el)) {
    const meta = cat.get(key);
    const value = resolveValue(rawVal, meta);
    if (!value) continue;
    fields.push({
      key,
      label: labelFor(key, meta),
      value,
      section: sectionForKey(key),
      type: meta?.type ?? '',
    });
  }

  fields.sort((a, b) => {
    const sa = SECTION_ORDER.indexOf(a.section as (typeof SECTION_ORDER)[number]);
    const sb = SECTION_ORDER.indexOf(b.section as (typeof SECTION_ORDER)[number]);
    if (sa !== sb) return (sa < 0 ? 99 : sa) - (sb < 0 ? 99 : sb);
    return a.label.localeCompare(b.label);
  });

  return {
    internalId: resolvedInternalId,
    externalId: (el['objektnr_extern'] as string) || externalId || null,
    title: (el['objekttitel'] as string) || (el['objektart'] as string) || null,
    marketingType: (el['vermarktungsart'] as string) || null,
    objectType: (el['objektart'] as string) || null,
    priceLabel: formatPrice(el['kaufpreis'] ?? el['kaltmiete'] ?? el['warmmiete']),
    city: (el['ort'] as string) || null,
    heroImage: photos[0] ?? null,
    images: photos,
    fields,
    raw: el,
    discoveredKeys: Array.from(new Set(validKeys)).sort(),
  };
}

export { SECTION_ORDER };
