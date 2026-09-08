/**
 * onOffice API Client — HMAC v2 Authentication
 *
 * Key facts (confirmed by testing):
 *  - HMAC v2 = SHA256(timestamp + token + resourcetype + actionid), Base64
 *  - Each request must contain only ONE action (multi-action batches → error 141)
 *  - Estate read: resourcetype="estate", actionid="...action:read", resourceid=<internalId>
 *  - Photos:      resourcetype="estatepictures", actionid="...action:get", resourceid=0
 *  - The local machine clock is ~258 s ahead of onOffice servers; we compensate by
 *    using ONOFFICE_TS_OFFSET_S (default 270) to subtract from Date.now()
 */

import crypto from 'crypto';
import { Property } from '@/data/properties';

// ─── Config ──────────────────────────────────────────────────────────────────
const TOKEN   = process.env.ONOFFICE_TOKEN      ?? '';
const SECRET  = process.env.ONOFFICE_SECRET     ?? '';
const API_URL = process.env.ONOFFICE_API_URL    ?? 'https://api.onoffice.de/api/latest/api.php';
// Seconds by which the local clock is ahead of the onOffice server clock.
// Measured: local leads by ~258 s; use 270 s as a safe buffer.
const TS_OFFSET = parseInt(process.env.ONOFFICE_TS_OFFSET_S ?? '270', 10);

const ACTION_READ = 'urn:onoffice-de-ns:smart:2.5:smartml:action:read';
const ACTION_GET  = 'urn:onoffice-de-ns:smart:2.5:smartml:action:get';

/**
 * The 3 properties to display on the site.
 * internalId → onOffice resourceid used to query the API.
 * externalId → public URL slug (matches objektnr_extern in onOffice).
 */
export const PROPERTY_CONFIGS = [
  { internalId: 1309, externalId: '26-BO-619', category: 'apartment'    },
  { internalId: 1327, externalId: '26-BO-625', category: 'bungalow'     },
  { internalId: 1287, externalId: '26-BO-610', category: 'multi-family' },
] as const;

const ESTATE_FIELDS = [
  'Id', 'objekttitel', 'vermarktungsart', 'objektart',
  'kaufpreis', 'kaltmiete', 'warmmiete',
  'ort', 'plz', 'strasse', 'lage',
  'wohnflaeche', 'nutzflaeche', 'grundstuecksflaeche',
  'anzahl_zimmer',
  'objektbeschreibung',
  'breitengrad', 'laengengrad', 'objektnr_extern',
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

/**
 * Compute the onOffice-compatible Unix timestamp.
 * The development machine clock is ahead of the onOffice server clock by ~258 s,
 * so we subtract TS_OFFSET to arrive at a timestamp the server will accept.
 */
function getTimestamp(): number {
  return Math.floor(Date.now() / 1000) - TS_OFFSET;
}

// ─── Core Request ─────────────────────────────────────────────────────────────

interface OnOfficeAction {
  actionid:     string;
  resourcetype: string;
  resourceid?:  number;
  identifier?:  string;
  parameters:   Record<string, unknown>;
}

/**
 * Make a single-action onOffice API call.
 * Returns the `data` object from the first result.
 */
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
          resourceid:   action.resourceid ?? 0,
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
    signal:  AbortSignal.timeout(5000),
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
  config: typeof PROPERTY_CONFIGS[number],
  photos: string[],
): Property {
  const el = record.elements;

  const title    = (el['objekttitel'] as string) || config.category;
  const location = [el['strasse'], el['plz'], el['ort']]
    .filter(Boolean).join(', ') || (el['lage'] as string) || 'Deutschland';
  const price    = formatPrice(el['kaufpreis'] ?? el['kaltmiete'] ?? el['warmmiete']);
  const specs    = buildSpecs(el);

  const description =
    (el['objektbeschreibung'] as string) || (el['freitext_1'] as string) || '';

  const amenityRaw = (el['ausstattungsbeschreibung'] as string) ?? '';
  const amenities  = amenityRaw.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean);

  return {
    id:            config.externalId,
    imageSrc:      photos[0] ?? '/images/prop_apartment_new.jpg',
    type:          title,
    price,
    location,
    specs,
    featured:      true,
    galleryImages: photos.length > 0 ? photos : undefined,
    description:   description || undefined,
    amenities:     amenities.length > 0 ? amenities : undefined,
  };
}

// ─── Core Estate Fetcher ──────────────────────────────────────────────────────

async function fetchEstateById(
  config: typeof PROPERTY_CONFIGS[number],
): Promise<Property> {
  const data = (await callOnOffice({
    actionid:     ACTION_READ,
    resourcetype: 'estate',
    resourceid:   config.internalId,
    identifier:   `estate-${config.internalId}`,
    parameters:   { data: ESTATE_FIELDS },
  })) as { records: Array<{ id: number; elements: Record<string, unknown> }> };

  const record = data?.records?.[0];
  if (!record) {
    throw new Error(`Estate ${config.internalId} returned no records`);
  }

  const photos   = await fetchEstatePhotos(config.internalId);
  const property = mapEstateToProperty(record, config, photos);

  // Map GPS coordinates if present
  const lat = parseFloat(String(record.elements['breitengrad'] ?? ''));
  const lng = parseFloat(String(record.elements['laengengrad']  ?? ''));
  if (!isNaN(lat) && !isNaN(lng)) {
    property.locationData = { coordinates: [lat, lng] };
  }

  return property;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Fetch all 3 configured properties from onOffice (parallel). */
export async function fetchOnOfficeProperties(): Promise<Property[]> {
  if (!TOKEN || !SECRET) {
    return [];
  }
  const results = await Promise.allSettled(
    PROPERTY_CONFIGS.map((config) => fetchEstateById(config)),
  );

  const properties: Property[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') {
      properties.push(r.value);
    } else {
      console.error('[onoffice] fetchOnOfficeProperties error:', r.reason);
    }
  }
  return properties;
}

/** Fetch a single property by its external ID (URL slug). */
export async function fetchOnOfficePropertyById(
  externalId: string,
): Promise<Property | null> {
  if (!TOKEN || !SECRET) {
    return null;
  }
  const config = PROPERTY_CONFIGS.find((c) => c.externalId === externalId);
  if (!config) return null;

  try {
    return await fetchEstateById(config);
  } catch (err) {
    console.error(`[onoffice] fetchOnOfficePropertyById(${externalId}) error:`, err);
    return null;
  }
}
