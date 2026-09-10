'use server';

import { createId } from '@paralleldrive/cuid2';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';
import {
  fetchEstateSnapshot,
  hasOnOfficeCredentials,
  type OnOfficeEstateSnapshot,
} from '@/lib/onoffice';
import {
  getEstateFieldCatalog,
  getValidEstateFieldKeys,
  saveValidEstateFieldKeys,
} from '@/lib/onoffice-properties';

const db = prisma as any;

/** Revalidate the public-facing property routes after any curation change. */
function revalidatePublic() {
  revalidatePath('/properties');
  revalidatePath('/properties/[id]', 'page');
  revalidatePath('/api/properties');
}

export type ActionResult<T = undefined> =
  | (T extends undefined ? { ok: true; data?: undefined } : { ok: true; data: T })
  | { ok: false; error: string };

// ── Shared snapshot writer ───────────────────────────────────────────────────

async function persistSnapshot(snapshot: OnOfficeEstateSnapshot): Promise<string> {
  const now = new Date();

  const base = {
    externalId: snapshot.externalId,
    title: snapshot.title,
    marketingType: snapshot.marketingType,
    objectType: snapshot.objectType,
    priceLabel: snapshot.priceLabel,
    city: snapshot.city,
    heroImage: snapshot.heroImage,
    imagesJson: JSON.stringify(snapshot.images ?? []),
    rawJson: JSON.stringify(snapshot.raw ?? {}),
    lastSyncedAt: now,
    updatedAt: now,
  };

  const row = await db.onoffice_properties.upsert({
    where: { internalId: snapshot.internalId },
    create: { id: createId(), internalId: snapshot.internalId, status: 'DRAFT', ...base },
    update: base,
    select: { id: true },
  });
  const propertyId: string = row.id;

  // Preserve visibility choices across re-syncs, keyed by field.
  const prev: Array<{ fieldKey: string; visible: boolean }> =
    await db.onoffice_property_fields.findMany({
      where: { propertyId },
      select: { fieldKey: true, visible: true },
    });
  const prevVisible = new Map(prev.map((p) => [p.fieldKey, p.visible]));

  await db.onoffice_property_fields.deleteMany({ where: { propertyId } });
  if (snapshot.fields.length > 0) {
    await db.onoffice_property_fields.createMany({
      data: snapshot.fields.map((f, i) => ({
        id: createId(),
        propertyId,
        fieldKey: f.key,
        label: f.label,
        value: f.value,
        section: f.section,
        fieldType: f.type || null,
        sortOrder: i,
        visible: prevVisible.get(f.key) ?? false,
      })),
    });
  }

  return propertyId;
}

/** Fetch a snapshot using cached catalogue + validated-key list, refreshing the cache. */
async function snapshotWithCache(opts: {
  internalId?: string | null;
  externalId?: string | null;
}): Promise<OnOfficeEstateSnapshot | null> {
  const [catalog, validKeys] = await Promise.all([
    getEstateFieldCatalog(),
    getValidEstateFieldKeys().catch(() => null),
  ]);
  const snapshot = await fetchEstateSnapshot(opts, { catalog, validKeys });
  if (snapshot?.discoveredKeys.length) {
    await saveValidEstateFieldKeys(snapshot.discoveredKeys).catch(() => {});
  }
  return snapshot;
}

// ── Import / refresh ─────────────────────────────────────────────────────────

const ImportInput = z
  .object({
    internalId: z.string().trim().max(64).optional().default(''),
    externalId: z.string().trim().max(64).optional().default(''),
  })
  .refine((v) => v.internalId || v.externalId, {
    message: 'Enter an Internal ID or an External ID.',
  });

export async function importPropertyFromOnOffice(
  input: z.input<typeof ImportInput>,
): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();

  const parsed = ImportInput.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }

  try {
    const snapshot = await snapshotWithCache({
      internalId: parsed.data.internalId || null,
      externalId: parsed.data.externalId || null,
    });
    if (!snapshot) {
      return { ok: false, error: 'No estate found for those IDs in onOffice.' };
    }

    const id = await persistSnapshot(snapshot);
    revalidatePath('/admin/properties');
    revalidatePath(`/admin/properties/${id}`);
    revalidatePublic();
    return { ok: true, data: { id } };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to reach onOffice.' };
  }
}

export async function refreshProperty(id: string): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();

  const row = await db.onoffice_properties.findUnique({
    where: { id },
    select: { internalId: true, externalId: true },
  });
  if (!row) return { ok: false, error: 'Property not found.' };

  try {
    const snapshot = await snapshotWithCache({
      internalId: row.internalId,
      externalId: row.externalId,
    });
    if (!snapshot) {
      return { ok: false, error: 'onOffice no longer returns this estate.' };
    }
    const newId = await persistSnapshot(snapshot);
    revalidatePath('/admin/properties');
    revalidatePath(`/admin/properties/${newId}`);
    revalidatePublic();
    return { ok: true, data: { id: newId } };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to reach onOffice.' };
  }
}

// ── Visibility toggles ───────────────────────────────────────────────────────

const FieldToggle = z.object({
  propertyId: z.string().min(1),
  fieldId: z.string().min(1),
  visible: z.boolean(),
});

export async function setFieldVisibility(
  input: z.infer<typeof FieldToggle>,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = FieldToggle.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'Invalid input' };

  const { propertyId, fieldId, visible } = parsed.data;
  const updated = await db.onoffice_property_fields.updateMany({
    where: { id: fieldId, propertyId },
    data: { visible },
  });
  if (updated.count === 0) return { ok: false, error: 'Field not found.' };

  revalidatePath(`/admin/properties/${propertyId}`);
  revalidatePublic();
  return { ok: true };
}

const SectionToggle = z.object({
  propertyId: z.string().min(1),
  section: z.string().min(1),
  visible: z.boolean(),
});

export async function setSectionVisibility(
  input: z.infer<typeof SectionToggle>,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = SectionToggle.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'Invalid input' };

  const { propertyId, section, visible } = parsed.data;
  await db.onoffice_property_fields.updateMany({
    where: { propertyId, section },
    data: { visible },
  });
  revalidatePath(`/admin/properties/${propertyId}`);
  revalidatePublic();
  return { ok: true };
}

const AllToggle = z.object({
  propertyId: z.string().min(1),
  visible: z.boolean(),
});

export async function setAllVisibility(
  input: z.infer<typeof AllToggle>,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = AllToggle.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'Invalid input' };

  await db.onoffice_property_fields.updateMany({
    where: { propertyId: parsed.data.propertyId },
    data: { visible: parsed.data.visible },
  });
  revalidatePath(`/admin/properties/${parsed.data.propertyId}`);
  revalidatePublic();
  return { ok: true };
}

// ── Status / delete ──────────────────────────────────────────────────────────

const StatusInput = z.object({
  id: z.string().min(1),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});

export async function setPropertyStatus(
  input: z.infer<typeof StatusInput>,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = StatusInput.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'Invalid input' };

  await db.onoffice_properties.update({
    where: { id: parsed.data.id },
    data: { status: parsed.data.status, updatedAt: new Date() },
  });
  revalidatePath('/admin/properties');
  revalidatePath(`/admin/properties/${parsed.data.id}`);
  revalidatePublic();
  return { ok: true };
}

export async function deleteProperty(id: string): Promise<ActionResult> {
  await requireAdmin();
  await db.onoffice_properties.delete({ where: { id } });
  revalidatePath('/admin/properties');
  revalidatePublic();
  return { ok: true };
}

/** Manually refresh the onOffice field catalogue (labels + select options). Slow. */
export async function refreshFieldCatalog(): Promise<ActionResult<{ fields: number }>> {
  await requireAdmin();
  if (!hasOnOfficeCredentials()) {
    return { ok: false, error: 'onOffice credentials are not configured.' };
  }
  try {
    const catalog = await getEstateFieldCatalog({ forceRefresh: true });
    if (catalog.size === 0) {
      return { ok: false, error: 'onOffice did not return the field catalogue (it can be slow — try again).' };
    }
    return { ok: true, data: { fields: catalog.size } };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to reach onOffice.' };
  }
}
