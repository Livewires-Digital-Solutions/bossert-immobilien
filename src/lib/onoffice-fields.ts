/**
 * Static fallback dictionary for onOffice `estate` fields.
 *
 * The live `fields` API (resourcetype "fields") returns ~500 labelled fields but
 * is slow (20–60 s) and occasionally times out, so it can't be on the critical
 * path of an admin action. We cache it opportunistically (see
 * `getEstateFieldCatalog` in onoffice-properties.ts) and fall back to this map:
 * a curated set of the fields that matter for a public listing, with German
 * labels (matching the source data and the public site) and section routing.
 * Any field not listed here still imports — its label is derived from the key
 * and its section from keyword rules.
 */

export interface StaticFieldMeta {
  label: string;
  section: string;
}

export const ESTATE_FIELD_DICTIONARY: Record<string, StaticFieldMeta> = {
  // ── Überblick ──
  objekttitel: { label: 'Objekttitel', section: 'Overview' },
  objektart: { label: 'Objektart', section: 'Overview' },
  objekttyp: { label: 'Objekttyp', section: 'Overview' },
  vermarktungsart: { label: 'Vermarktungsart', section: 'Overview' },
  nutzungsart: { label: 'Nutzungsart', section: 'Overview' },
  objektnr_extern: { label: 'Objekt-Nr. (extern)', section: 'Overview' },
  objektnr_intern: { label: 'Objekt-Nr. (intern)', section: 'Overview' },
  status: { label: 'Status', section: 'Overview' },
  verfuegbar_ab: { label: 'Verfügbar ab', section: 'Overview' },
  objektkategorie: { label: 'Kategorie', section: 'Overview' },
  vermietet: { label: 'Vermietet', section: 'Overview' },

  // ── Preis & Kosten ──
  kaufpreis: { label: 'Kaufpreis', section: 'Price' },
  kaufpreis_pro_qm: { label: 'Kaufpreis pro m²', section: 'Price' },
  kaltmiete: { label: 'Kaltmiete', section: 'Price' },
  warmmiete: { label: 'Warmmiete', section: 'Price' },
  nettokaltmiete: { label: 'Nettokaltmiete', section: 'Price' },
  nebenkosten: { label: 'Nebenkosten', section: 'Price' },
  heizkosten: { label: 'Heizkosten', section: 'Price' },
  heizkosten_in_nebenkosten: { label: 'Heizkosten in Nebenkosten enthalten', section: 'Price' },
  hausgeld: { label: 'Hausgeld', section: 'Price' },
  kaution: { label: 'Kaution', section: 'Price' },
  provision: { label: 'Provision', section: 'Price' },
  provisionspflichtig: { label: 'Provisionspflichtig', section: 'Price' },
  aussen_courtage: { label: 'Käuferprovision', section: 'Price' },
  innen_courtage: { label: 'Innenprovision', section: 'Price' },
  courtage_hinweis: { label: 'Provisionshinweis', section: 'Price' },
  provisionshinweis: { label: 'Provisionshinweis', section: 'Price' },
  waehrung: { label: 'Währung', section: 'Price' },
  mietpreis_pro_qm: { label: 'Miete pro m²', section: 'Price' },
  stellplatzmiete: { label: 'Stellplatzmiete', section: 'Price' },
  stellplatzkaufpreis: { label: 'Stellplatz-Kaufpreis', section: 'Price' },

  // ── Flächen ──
  wohnflaeche: { label: 'Wohnfläche', section: 'Areas' },
  nutzflaeche: { label: 'Nutzfläche', section: 'Areas' },
  gesamtflaeche: { label: 'Gesamtfläche', section: 'Areas' },
  grundstuecksflaeche: { label: 'Grundstücksfläche', section: 'Areas' },
  kellerflaeche: { label: 'Kellerfläche', section: 'Areas' },
  bueroflaeche: { label: 'Bürofläche', section: 'Areas' },
  lagerflaeche: { label: 'Lagerfläche', section: 'Areas' },
  gartenflaeche: { label: 'Gartenfläche', section: 'Areas' },
  balkon_terrasse_flaeche: { label: 'Balkon-/Terrassenfläche', section: 'Areas' },
  sonstige_flaeche: { label: 'Sonstige Fläche', section: 'Areas' },

  // ── Räume ──
  anzahl_zimmer: { label: 'Zimmer', section: 'Rooms' },
  anzahl_schlafzimmer: { label: 'Schlafzimmer', section: 'Rooms' },
  anzahl_badezimmer: { label: 'Badezimmer', section: 'Rooms' },
  anzahl_separate_wc: { label: 'Separate WCs', section: 'Rooms' },
  anzahl_balkone: { label: 'Balkone', section: 'Rooms' },
  anzahl_terrassen: { label: 'Terrassen', section: 'Rooms' },
  anzahl_etagen: { label: 'Etagen im Gebäude', section: 'Rooms' },
  etage: { label: 'Etage', section: 'Rooms' },
  anzahl_stellplaetze: { label: 'Stellplätze', section: 'Rooms' },
  anzahl_wohneinheiten: { label: 'Wohneinheiten', section: 'Rooms' },

  // ── Gebäude ──
  baujahr: { label: 'Baujahr', section: 'Building' },
  zustand: { label: 'Zustand', section: 'Building' },
  objektzustand: { label: 'Objektzustand', section: 'Building' },
  letzte_modernisierung: { label: 'Letzte Modernisierung', section: 'Building' },
  bauweise: { label: 'Bauweise', section: 'Building' },
  bausubstanz: { label: 'Bausubstanz', section: 'Building' },
  denkmalschutz: { label: 'Denkmalschutz', section: 'Building' },
  ausstattung: { label: 'Ausstattung', section: 'Building' },
  ausstattung_kategorie: { label: 'Ausstattungskategorie', section: 'Building' },
  moebliert: { label: 'Möbliert', section: 'Building' },
  aufzug: { label: 'Aufzug', section: 'Building' },
  keller: { label: 'Keller', section: 'Building' },
  dachform: { label: 'Dachform', section: 'Building' },

  // ── Energie ──
  energieausweistyp: { label: 'Energieausweistyp', section: 'Energy' },
  energieausweis_gueltig_bis: { label: 'Energieausweis gültig bis', section: 'Energy' },
  energieausweisbaujahr: { label: 'Energieausweis – Baujahr', section: 'Energy' },
  energieausweisBaujahr: { label: 'Energieausweis – Baujahr', section: 'Energy' },
  energieverbrauchskennwert: { label: 'Energieverbrauchskennwert', section: 'Energy' },
  endenergiebedarf: { label: 'Endenergiebedarf', section: 'Energy' },
  energieeffizienzklasse: { label: 'Energieeffizienzklasse', section: 'Energy' },
  heizungsart: { label: 'Heizungsart', section: 'Energy' },
  befeuerung: { label: 'Befeuerung', section: 'Energy' },
  energietraeger: { label: 'Energieträger', section: 'Energy' },
  wesentliche_energietraeger: { label: 'Wesentliche Energieträger', section: 'Energy' },
  primaerenergietraeger: { label: 'Primärenergieträger', section: 'Energy' },
  warmwasserversorgung: { label: 'Warmwasserversorgung', section: 'Energy' },
  co2_emission: { label: 'CO₂-Emissionen', section: 'Energy' },

  // ── Lage ──
  strasse: { label: 'Straße', section: 'Location' },
  hausnummer: { label: 'Hausnummer', section: 'Location' },
  plz: { label: 'PLZ', section: 'Location' },
  ort: { label: 'Ort', section: 'Location' },
  ortsteil: { label: 'Ortsteil', section: 'Location' },
  regionaler_zusatz: { label: 'Region', section: 'Location' },
  bundesland: { label: 'Bundesland', section: 'Location' },
  land: { label: 'Land', section: 'Location' },
  lage: { label: 'Lagebeschreibung', section: 'Location' },
  breitengrad: { label: 'Breitengrad', section: 'Location' },
  laengengrad: { label: 'Längengrad', section: 'Location' },

  // ── Beschreibung ──
  objektbeschreibung: { label: 'Objektbeschreibung', section: 'Description' },
  lage_beschreibung: { label: 'Lagebeschreibung', section: 'Description' },
  lagebeschreibung: { label: 'Lagebeschreibung', section: 'Description' },
  ausstattungExpose: { label: 'Ausstattungsbeschreibung', section: 'Description' },
  ausstatt_beschr: { label: 'Ausstattungsbeschreibung', section: 'Description' },
  ausstattungsbeschreibung: { label: 'Ausstattungsbeschreibung', section: 'Description' },
  sonstige_angaben: { label: 'Sonstige Angaben', section: 'Description' },
  objekttext: { label: 'Objekttext', section: 'Description' },
  freitext_1: { label: 'Freitext', section: 'Description' },
};

export const DICTIONARY_KEYS = Object.keys(ESTATE_FIELD_DICTIONARY);

/** Turn `anzahl_schlafzimmer` into `Anzahl schlafzimmer`. */
export function humaniseFieldKey(key: string): string {
  const s = key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}
