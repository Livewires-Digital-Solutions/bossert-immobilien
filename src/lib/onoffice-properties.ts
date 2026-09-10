import 'server-only';
import { createId } from '@paralleldrive/cuid2';
import { prisma } from '@/lib/prisma';
import {
  SECTION_ORDER,
  fetchEstateFieldCatalog,
  serialiseCatalog,
  deserialiseCatalog,
  primeCatalogCache,
  type OnOfficeFieldMeta,
} from '@/lib/onoffice';

/**
 * Data-access layer for onOffice-imported properties.
 *
 *  - Admin helpers (`listAdminProperties`, `getAdminProperty`) return everything.
 *  - Frontend helpers (`getPublishedProperties`, `getPublishedProperty`) are the
 *    documented contract for the public site: only PUBLISHED rows, and only the
 *    fields an admin flagged `visible = true`, already grouped + ordered.
 */

export type OnOfficeStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

const db = prisma as any;

// ── Field catalogue (labels + select options) — DB-cached ────────────────────

const CATALOG_PAGE = 'onoffice';
const CATALOG_KEY = 'estate_field_catalog';
const CATALOG_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const CATALOG_RETRY_BACKOFF_MS = 15 * 60 * 1000;

let lastCatalogFailureAt = 0;

/**
 * Returns the onOffice estate field catalogue as a Map, cached in `site_settings`.
 *
 * By default this only reads the DB cache — the live `fields` call is slow
 * (30–90 s) and flaky, so it must not sit on the import path. Pass
 * `forceRefresh` (the "Sync field labels" button) to hit onOffice and repopulate
 * the cache. Without a cached catalogue, imports still work via the static field
 * dictionary + validated-key discovery.
 */
export async function getEstateFieldCatalog(
  { forceRefresh = false, allowLiveFetch = false }: { forceRefresh?: boolean; allowLiveFetch?: boolean } = {},
): Promise<Map<string, OnOfficeFieldMeta>> {
  const row = await db.site_settings.findUnique({
    where: { page_keyName: { page: CATALOG_PAGE, keyName: CATALOG_KEY } },
  });

  const cached = row ? deserialiseCatalog(safeParse(row.valueEn)) : new Map();
  const stale = !row || Date.now() - new Date(row.updatedAt).getTime() > CATALOG_MAX_AGE_MS;

  if (cached.size > 0) primeCatalogCache(cached);
  if (!forceRefresh && (!allowLiveFetch || (cached.size > 0 && !stale))) return cached;

  // Back off after a recent failure so callers don't each wait on a slow call.
  if (!forceRefresh && Date.now() - lastCatalogFailureAt < CATALOG_RETRY_BACKOFF_MS) {
    return cached;
  }

  try {
    const fresh = await fetchEstateFieldCatalog({ timeoutMs: 90000, force: true });
    if (fresh.size > 0) {
      const now = new Date();
      await db.site_settings.upsert({
        where: { page_keyName: { page: CATALOG_PAGE, keyName: CATALOG_KEY } },
        create: {
          id: createId(),
          page: CATALOG_PAGE,
          keyName: CATALOG_KEY,
          valueEn: JSON.stringify(serialiseCatalog(fresh)),
          updatedAt: now,
        },
        update: { valueEn: JSON.stringify(serialiseCatalog(fresh)), updatedAt: now },
      });
      return fresh;
    }
    lastCatalogFailureAt = Date.now();
  } catch {
    lastCatalogFailureAt = Date.now();
  }
  return cached;
}

function safeParse(s: string | null | undefined): Record<string, OnOfficeFieldMeta> | null {
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

// ── Validated field-key list (fast import path) ──────────────────────────────

const VALID_KEYS_KEY = 'valid_estate_fields';

/** Field keys previously confirmed valid for this onOffice account, if cached. */
export async function getValidEstateFieldKeys(): Promise<string[] | null> {
  const row = await db.site_settings.findUnique({
    where: { page_keyName: { page: CATALOG_PAGE, keyName: VALID_KEYS_KEY } },
  });
  if (!row?.valueEn) return null;
  try {
    const arr = JSON.parse(row.valueEn);
    return Array.isArray(arr) && arr.length ? arr : null;
  } catch {
    return null;
  }
}

export async function saveValidEstateFieldKeys(keys: string[]): Promise<void> {
  if (!keys.length) return;
  const now = new Date();
  const sorted = Array.from(new Set(keys)).sort();
  await db.site_settings.upsert({
    where: { page_keyName: { page: CATALOG_PAGE, keyName: VALID_KEYS_KEY } },
    create: {
      id: createId(),
      page: CATALOG_PAGE,
      keyName: VALID_KEYS_KEY,
      valueEn: JSON.stringify(sorted),
      updatedAt: now,
    },
    update: { valueEn: JSON.stringify(sorted), updatedAt: now },
  });
}

// ── Shared row shapes ────────────────────────────────────────────────────────

export interface AdminPropertyRow {
  id: string;
  internalId: string;
  externalId: string | null;
  title: string | null;
  city: string | null;
  priceLabel: string | null;
  marketingType: string | null;
  objectType: string | null;
  status: OnOfficeStatus;
  heroImage: string | null;
  visibleCount: number;
  totalCount: number;
  lastSyncedAt: Date;
}

export interface AdminPropertyField {
  id: string;
  fieldKey: string;
  label: string;
  value: string | null;
  section: string;
  fieldType: string | null;
  visible: boolean;
  sortOrder: number;
}

export interface AdminPropertyDetail extends Omit<AdminPropertyRow, 'visibleCount' | 'totalCount'> {
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  sections: { name: string; fields: AdminPropertyField[] }[];
}

// ── Admin reads ──────────────────────────────────────────────────────────────

export async function listAdminProperties(): Promise<AdminPropertyRow[]> {
  const rows = await db.onoffice_properties.findMany({
    orderBy: [{ updatedAt: 'desc' }],
    include: { fields: { select: { visible: true } } },
  });

  return rows.map((r: any) => ({
    id: r.id,
    internalId: r.internalId,
    externalId: r.externalId,
    title: r.title,
    city: r.city,
    priceLabel: r.priceLabel,
    marketingType: r.marketingType,
    objectType: r.objectType,
    status: r.status,
    heroImage: r.heroImage,
    visibleCount: r.fields.filter((f: any) => f.visible).length,
    totalCount: r.fields.length,
    lastSyncedAt: r.lastSyncedAt,
  }));
}

function orderSections(fields: AdminPropertyField[]) {
  const bySection = new Map<string, AdminPropertyField[]>();
  for (const f of fields) {
    if (!bySection.has(f.section)) bySection.set(f.section, []);
    bySection.get(f.section)!.push(f);
  }

  const names = Array.from(bySection.keys()).sort((a, b) => {
    const ia = SECTION_ORDER.indexOf(a as (typeof SECTION_ORDER)[number]);
    const ib = SECTION_ORDER.indexOf(b as (typeof SECTION_ORDER)[number]);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });

  return names.map((name) => ({
    name,
    fields: bySection
      .get(name)!
      .sort((a, b) => a.sortOrder - b.sortOrder || a.label.localeCompare(b.label)),
  }));
}

export async function getAdminProperty(id: string): Promise<AdminPropertyDetail | null> {
  const r = await db.onoffice_properties.findUnique({
    where: { id },
    include: { fields: true },
  });
  if (!r) return null;

  const fields: AdminPropertyField[] = r.fields.map((f: any) => ({
    id: f.id,
    fieldKey: f.fieldKey,
    label: f.label,
    value: f.value,
    section: f.section,
    fieldType: f.fieldType,
    visible: f.visible,
    sortOrder: f.sortOrder,
  }));

  let images: string[] = [];
  try {
    images = r.imagesJson ? JSON.parse(r.imagesJson) : [];
  } catch {
    images = [];
  }

  return {
    id: r.id,
    internalId: r.internalId,
    externalId: r.externalId,
    title: r.title,
    city: r.city,
    priceLabel: r.priceLabel,
    marketingType: r.marketingType,
    objectType: r.objectType,
    status: r.status,
    heroImage: r.heroImage,
    images,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
    lastSyncedAt: r.lastSyncedAt,
    sections: orderSections(fields),
  };
}

// ── Frontend contract ────────────────────────────────────────────────────────

export interface PublicPropertyField {
  key: string;
  label: string;
  value: string;
  section: string;
}

export interface PublicProperty {
  internalId: string;
  externalId: string | null;
  title: string | null;
  city: string | null;
  priceLabel: string | null;
  marketingType: string | null;
  heroImage: string | null;
  images: string[];
  /** Admin-approved fields only, grouped + ordered. */
  sections: { name: string; fields: PublicPropertyField[] }[];
  /** Flat lookup for one-off rendering, e.g. `fields['heizungsart']`. */
  fields: Record<string, PublicPropertyField>;
}

function toPublic(r: any): PublicProperty {
  let images: string[] = [];
  try {
    images = r.imagesJson ? JSON.parse(r.imagesJson) : [];
  } catch {
    images = [];
  }

  const visible: AdminPropertyField[] = (r.fields ?? [])
    .filter((f: any) => f.visible)
    .map((f: any) => ({
      id: f.id,
      fieldKey: f.fieldKey,
      label: f.label,
      value: f.value,
      section: f.section,
      fieldType: f.fieldType,
      visible: f.visible,
      sortOrder: f.sortOrder,
    }));

  const sections = orderSections(visible).map((s) => ({
    name: s.name,
    fields: s.fields.map((f) => ({
      key: f.fieldKey,
      label: f.label,
      value: f.value ?? '',
      section: f.section,
    })),
  }));

  const flat: Record<string, PublicPropertyField> = {};
  for (const s of sections) for (const f of s.fields) flat[f.key] = f;

  return {
    internalId: r.internalId,
    externalId: r.externalId,
    title: r.title,
    city: r.city,
    priceLabel: r.priceLabel,
    marketingType: r.marketingType,
    heroImage: r.heroImage,
    images,
    sections,
    fields: flat,
  };
}

export async function getPublishedProperties(): Promise<PublicProperty[]> {
  const rows = await db.onoffice_properties.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ updatedAt: 'desc' }],
    include: { fields: true },
  });
  return rows.map(toPublic);
}

export async function getPublishedProperty(idOrExternalId: string): Promise<PublicProperty | null> {
  const r = await db.onoffice_properties.findFirst({
    where: {
      status: 'PUBLISHED',
      OR: [{ internalId: idOrExternalId }, { externalId: idOrExternalId }],
    },
    include: { fields: true },
  });
  return r ? toPublic(r) : null;
}
