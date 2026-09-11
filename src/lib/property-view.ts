import 'server-only';
import type { Property } from '@/data/properties';
import {
  getPublishedProperties,
  getPublishedProperty,
  type PublicProperty,
} from '@/lib/onoffice-properties';
import { ESTATE_FIELD_DICTIONARY, humaniseFieldKey } from '@/lib/onoffice-fields';

/**
 * Adapts the admin-curated onOffice data (published rows, admin-enabled fields
 * only) into the `Property` shape the public site components already consume,
 * plus a generic `sections` list so the detail page can render every enabled
 * fact without a code change when the admin toggles more on.
 */

export interface PublicPropertyView {
  property: Property;
  /** Enabled fact fields, grouped + ordered, formatted for display. */
  sections: { name: string; fields: { key: string; label: string; value: string }[] }[];
}

// ── value helpers ────────────────────────────────────────────────────────────

function toNumber(v?: string | null): number | undefined {
  if (!v) return undefined;
  let s = String(v).trim().replace(/[^\d.,-]/g, '');
  if (!s) return undefined;
  // onOffice sends '.' as the decimal separator ("549000.00", "93.00"). Only when
  // BOTH separators appear is '.' a thousands separator ("1.234,56").
  s = s.includes('.') && s.includes(',') ? s.replace(/\./g, '').replace(',', '.') : s.replace(',', '.');
  const n = parseFloat(s);
  return Number.isNaN(n) ? undefined : n;
}

function fmtArea(v?: string | null): string | undefined {
  const n = toNumber(v);
  return n !== undefined && n > 0 ? `${n.toLocaleString('de-DE')} m²` : undefined;
}

function fmtCount(v?: string | null): string | undefined {
  const n = toNumber(v);
  if (n === undefined || n <= 0) return undefined;
  return Number.isInteger(n) ? String(n) : n.toLocaleString('de-DE');
}

function fmtEuro(v?: string | null): string | undefined {
  const n = toNumber(v);
  return n && n > 0 ? `€ ${n.toLocaleString('de-DE', { maximumFractionDigits: 0 })}` : undefined;
}

/** Prefer a clean German label from the dictionary; fall back to stored / humanised. */
function labelFor(key: string, stored: string): string {
  const dict = ESTATE_FIELD_DICTIONARY[key]?.label;
  if (dict) return dict;
  if (stored && stored !== key) return stored;
  return humaniseFieldKey(key);
}

const EURO_KEYS = new Set([
  'kaufpreis', 'kaltmiete', 'warmmiete', 'nettokaltmiete', 'nebenkosten', 'heizkosten',
  'hausgeld', 'kaution', 'stellplatzmiete', 'stellplatzkaufpreis', 'kaufpreis_pro_qm',
  'mietpreis_pro_qm', 'kaufpreisnetto', 'mietpreisnetto',
]);
const BOOL_KEYS = new Set([
  'vermietet', 'provisionspflichtig', 'denkmalschutz', 'moebliert', 'aufzug', 'keller',
  'barrierefrei', 'unterkellert', 'gaeste_wc', 'ferienimmobilie', 'geeignet_als_ferienwohnung',
]);

/**
 * Light generic formatting for the curated-facts renderer. Returns '' for values
 * that shouldn't be shown (empty, zeros) — the caller drops those fields.
 */
function fmtGeneric(key: string, raw: string): string {
  const k = key.toLowerCase();
  let s = raw.trim().replace(/([.,]0+)$/, '');
  if (!s || s === '0') return '';

  if (BOOL_KEYS.has(k) || /^(ist_|hat_)/.test(k)) {
    return s === '1' || s === 'true' || s === 'Yes' || s === 'Ja' ? 'Ja' : 'Nein';
  }
  if (/(flaeche|flache|grundstueck)/.test(k)) return fmtArea(s) ?? '';
  if (/^anzahl_/.test(k) || k === 'etage') return fmtCount(s) ?? '';
  if (EURO_KEYS.has(k) && /^[\d.,]+$/.test(s)) return fmtEuro(s) ?? '';

  // Energy consumption values → German decimal + unit.
  if (/(energieverbrauchskennwert|endenergiebedarf|primaerenergie)/.test(k) && /^[\d.,]+$/.test(s)) {
    const n = toNumber(s);
    return n ? `${n.toLocaleString('de-DE', { maximumFractionDigits: 1 })} kWh/(m²·a)` : '';
  }

  // ISO date → DD.MM.YYYY
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[3]}.${iso[2]}.${iso[1]}`;

  if (s === 'Yes') return 'Ja';
  if (s === 'No') return 'Nein';
  if (s === 'DEU') return 'Deutschland';

  // Capitalise a bare lowercase enum token ("kauf" → "Kauf").
  if (/^[a-zäöüß][a-zäöüß_-]*$/.test(s)) {
    s = s.charAt(0).toUpperCase() + s.slice(1).replace(/[_-]+/g, ' ');
  }
  return s;
}

/**
 * onOffice `ausstattungExpose` is a free-text list, newline-separated, where a
 * line may use a comma as a decimal separator ("70,81 m²"). Split on line
 * breaks/bullets only — never on commas — and drop obvious junk fragments.
 */
function parseAmenities(raw?: string | null): string[] | undefined {
  if (!raw) return undefined;
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of raw.split(/\r?\n|·|•/)) {
    const s = line.replace(/^[\s\-–—*•]+/, '').trim();
    if (s.length < 3) continue;
    if (!/[a-zäöüßA-ZÄÖÜ]/.test(s)) continue; // pure numbers / separators
    if (/^(whg\.?|wohnung|obergeschoss|erdgeschoss|dachgeschoss)\b/i.test(s)) continue;
    const key = s.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s.replace(/\s{2,}/g, ' '));
    if (out.length >= 24) break;
  }
  return out.length ? out : undefined;
}

/** onOffice titles are often pipe-stuffed ("Villa | 5 Zi | 250 m² | Ort"). Keep the lead phrase. */
function cleanTitle(raw: string): string {
  let t = raw.trim().replace(/\s+/g, ' ');
  if (t.includes('|')) t = t.split('|')[0].trim().replace(/[–—-]\s*$/, '').trim();
  if (t.length <= 88) return t;
  return t.slice(0, 86).replace(/\s\S*$/, '') + '…';
}

// Keys surfaced elsewhere on the page, or internal workflow noise.
const HANDLED_KEYS = new Set([
  'Id',
  'objekttitel',
  'objektart',
  'objekttyp',
  'objektnr_extern',
  'objektnr_intern',
  'status',
  'waehrung',
  'currency',
  'kaufpreis',
  'kaltmiete',
  'warmmiete',
  'nettokaltmiete',
  'ort',
  'plz',
  'strasse',
  'hausnummer',
  'breitengrad',
  'laengengrad',
  'objektbeschreibung',
  'freitext_1',
  'ausstattungExpose',
  'ausstatt_beschr',
  'ausstattungsbeschreibung',
  'aussen_courtage',
  'provisionshinweis',
]);

// ── mapping ──────────────────────────────────────────────────────────────────

function mapToProperty(p: PublicProperty): PublicPropertyView {
  const f = p.fields;
  const has = (k: string) => Boolean(f[k]?.value);
  const val = (k: string) => f[k]?.value;

  const id = p.externalId || p.internalId;

  const priceVisible = has('kaufpreis') || has('kaltmiete') || has('warmmiete');
  const price =
    fmtEuro(val('kaufpreis')) ??
    fmtEuro(val('kaltmiete')) ??
    fmtEuro(val('warmmiete')) ??
    (priceVisible ? p.priceLabel ?? 'Preis auf Anfrage' : 'Preis auf Anfrage');

  const locationParts = [val('strasse'), val('plz'), val('ort')].filter(Boolean);
  const location = locationParts.length ? locationParts.join(', ') : p.city || 'Deutschland';

  const livingArea = fmtArea(val('wohnflaeche')) ?? fmtArea(val('nutzflaeche'));
  const plotArea = fmtArea(val('grundstuecksflaeche'));
  const rooms = fmtCount(val('anzahl_zimmer'));
  const bedrooms = fmtCount(val('anzahl_schlafzimmer'));
  const bathrooms = fmtCount(val('anzahl_badezimmer'));

  const specParts: string[] = [];
  if (rooms) specParts.push(`${rooms} Zimmer`);
  if (livingArea) specParts.push(livingArea);
  if (plotArea) specParts.push(`${plotArea} Grundstück`);

  const amenityRaw = val('ausstattungExpose') || val('ausstatt_beschr') || val('ausstattungsbeschreibung');
  const amenities = parseAmenities(amenityRaw);

  const heatingType = val('heizungsart');
  const firing = val('befeuerung') || val('energietraeger') || val('wesentliche_energietraeger');
  const energyPassType = val('energieausweistyp');
  const energyConsumption = val('endenergiebedarf') || val('energieverbrauchskennwert');
  const energyClass = val('energieeffizienzklasse');
  const energy =
    heatingType || firing || energyPassType || energyConsumption || energyClass
      ? { heatingType, firing, energyPassType, energyConsumption, energyEfficiencyClass: energyClass }
      : undefined;

  const lat = toNumber(val('breitengrad'));
  const lng = toNumber(val('laengengrad'));
  const coordinates: [number, number] | undefined =
    lat !== undefined && lng !== undefined ? [lat, lng] : undefined;

  const displayTitle = cleanTitle(p.title || val('objektart') || 'Immobilie');

  const property: Property = {
    id,
    imageSrc: p.heroImage || '/images/prop_apartment_new.jpg',
    type: displayTitle,
    title: displayTitle,
    price,
    location,
    specs: specParts.join(' • '),
    transactionType:
      p.marketingType?.toLowerCase().includes('kauf')
        ? 'Buy'
        : p.marketingType?.toLowerCase().includes('miet')
          ? 'Rent'
          : undefined,
    galleryImages: p.images.length ? p.images : undefined,
    description: has('objektbeschreibung') ? val('objektbeschreibung') : has('freitext_1') ? val('freitext_1') : undefined,
    amenities: amenities && amenities.length ? amenities : undefined,
    livingArea,
    plotArea,
    rooms,
    bedrooms,
    bathrooms,
    buildYear: has('baujahr') ? String(val('baujahr')).replace(/([.,]0+)$/, '') : undefined,
    condition: val('zustand') || val('objektzustand') || undefined,
    energy,
    commission: val('aussen_courtage') || val('provisionshinweis') || undefined,
    detailedSpecs: {
      livingArea: toNumber(val('wohnflaeche')) ?? toNumber(val('nutzflaeche')),
      rooms: toNumber(val('anzahl_zimmer')),
      bathrooms: toNumber(val('anzahl_badezimmer')),
      plotArea: toNumber(val('grundstuecksflaeche')),
    },
    locationData: coordinates ? { coordinates } : undefined,
  };

  const sections = p.sections
    .map((s) => ({
      name: s.name,
      fields: s.fields
        .filter((fld) => !HANDLED_KEYS.has(fld.key) && fld.value.trim())
        .map((fld) => ({
          key: fld.key,
          label: labelFor(fld.key, fld.label),
          value: fmtGeneric(fld.key, fld.value),
        }))
        .filter((fld) => fld.value.trim().length > 0),
    }))
    .filter((s) => s.fields.length > 0);

  return { property, sections };
}

// ── public API ───────────────────────────────────────────────────────────────

/** Published properties as cards. Returns null when the admin has published none. */
export async function getPublicPropertyCards(): Promise<Property[] | null> {
  const rows = await getPublishedProperties();
  if (rows.length === 0) return null;
  return rows.map((r) => mapToProperty(r).property);
}

/** A single published property + its enabled detail sections, or null. */
export async function getPublicPropertyView(idOrExternalId: string): Promise<PublicPropertyView | null> {
  const row = await getPublishedProperty(idOrExternalId);
  return row ? mapToProperty(row) : null;
}

/** Other published properties for a "related listings" rail. */
export async function getRelatedProperties(excludeId: string, limit = 3): Promise<Property[]> {
  const rows = await getPublishedProperties();
  return rows
    .filter((r) => r.externalId !== excludeId && r.internalId !== excludeId)
    .slice(0, limit)
    .map((r) => mapToProperty(r).property);
}
