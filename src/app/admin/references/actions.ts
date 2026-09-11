'use server';

import { randomUUID } from 'node:crypto';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

const StatInput = z.object({ label: z.string().trim().min(1).max(80), value: z.string().trim().min(1).max(80) });

const ReferenceInput = z.object({
  id: z.string().optional(),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens only'),
  titleEn: z.string().trim().min(1).max(200),
  titleDe: z.string().trim().max(200).optional().or(z.literal('')),
  location: z.string().trim().min(1).max(200),
  type: z.string().trim().min(1).max(80),
  heroImage: z.string().trim().max(500).optional().or(z.literal('')),
  size: z.string().trim().max(20).optional().or(z.literal('')),
  featured: z.boolean(),
  order: z.number().int(),
  isActive: z.boolean(),
  descriptionEn: z.string().trim().min(1).max(2000),
  descriptionDe: z.string().trim().max(2000).optional().or(z.literal('')),
  fullDescEn: z.string().trim().max(20000).optional().or(z.literal('')),
  fullDescDe: z.string().trim().max(20000).optional().or(z.literal('')),
  stats: z.array(StatInput).max(6),
  features: z.array(z.object({ featureEn: z.string().trim().min(1).max(300), featureDe: z.string().trim().max(300).optional().or(z.literal('')) })).max(20),
  images: z.array(z.string().trim().min(1).max(500)).max(20),
});

export type ReferenceFormValues = z.infer<typeof ReferenceInput>;
export type SaveResult = { ok: true; id: string } | { ok: false; error: string };

export async function saveReference(input: ReferenceFormValues): Promise<SaveResult> {
  await requireAdmin();

  const parsed = ReferenceInput.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }
  const { id, stats, features, images, ...rest } = parsed.data;
  const now = new Date();

  const data = {
    ...rest,
    titleDe: rest.titleDe || null,
    heroImage: rest.heroImage || null,
    size: rest.size || null,
    descriptionDe: rest.descriptionDe || null,
    fullDescEn: rest.fullDescEn || null,
    fullDescDe: rest.fullDescDe || null,
    statsJson: stats.length ? JSON.stringify(stats) : null,
    updatedAt: now,
  };

  try {
    const refId = id ?? createId();

    if (id) {
      await prisma.references.update({ where: { id }, data });
      await prisma.reference_features.deleteMany({ where: { referenceId: id } });
      await prisma.reference_images.deleteMany({ where: { referenceId: id } });
    } else {
      await prisma.references.create({ data: { ...data, id: refId } });
    }

    if (features.length) {
      await prisma.reference_features.createMany({
        data: features.map((f, i) => ({
          id: createId(),
          referenceId: refId,
          featureEn: f.featureEn,
          featureDe: f.featureDe || null,
          order: i,
        })),
      });
    }
    if (images.length) {
      await prisma.reference_images.createMany({
        data: images.map((url, i) => ({ id: createId(), referenceId: refId, url, order: i })),
      });
    }

    revalidatePath('/references');
    revalidatePath(`/references/${rest.slug}`);
    revalidatePath('/admin/references');
    return { ok: true, id: refId };
  } catch (e) {
    const msg = String(e);
    if (msg.includes('Unique constraint') || msg.includes('P2002')) {
      return { ok: false, error: 'That slug is already used by another reference.' };
    }
    return { ok: false, error: 'Could not save the reference.' };
  }
}

export async function deleteReference(id: string): Promise<{ ok: boolean }> {
  await requireAdmin();
  const r = await prisma.references.findUnique({ where: { id } });
  await prisma.references.delete({ where: { id } });
  if (r) revalidatePath(`/references/${r.slug}`);
  revalidatePath('/references');
  revalidatePath('/admin/references');
  return { ok: true };
}

const ALLOWED = new Map<string, string>([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/avif', 'avif'],
  ['image/gif', 'gif'],
]);

export async function uploadReferenceImage(
  formData: FormData,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await requireAdmin();

  const file = formData.get('file');
  if (!(file instanceof File)) return { ok: false, error: 'No file received' };

  const ext = ALLOWED.get(file.type);
  if (!ext) return { ok: false, error: 'Use JPG, PNG, WebP, AVIF or GIF' };

  const maxMb = Number(process.env.UPLOAD_MAX_SIZE_MB ?? 20);
  if (file.size > maxMb * 1024 * 1024) {
    return { ok: false, error: `Image must be under ${maxMb} MB` };
  }

  const dir = path.join(process.cwd(), 'public', 'uploads', 'references');
  await mkdir(dir, { recursive: true });
  const name = `${randomUUID()}.${ext}`;
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  return { ok: true, url: `/uploads/references/${name}` };
}
