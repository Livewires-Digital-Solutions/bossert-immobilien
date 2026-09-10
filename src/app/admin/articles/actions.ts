'use server';

import { randomUUID } from 'node:crypto';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

const ArticleInput = z.object({
  id: z.string().optional(),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens only'),
  category: z.string().trim().min(1).max(60),
  coverImage: z.string().trim().min(1).max(500),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  featured: z.boolean(),
  publishedAt: z.string().trim().min(1),
  titleEn: z.string().trim().min(1).max(200),
  titleDe: z.string().trim().min(1).max(200),
  excerptEn: z.string().trim().min(1).max(600),
  excerptDe: z.string().trim().min(1).max(600),
  bodyEn: z.string().trim().min(1),
  bodyDe: z.string().trim().min(1),
});

export type ArticleFormValues = z.infer<typeof ArticleInput>;
export type SaveResult = { ok: true; id: string } | { ok: false; error: string };

export async function saveArticle(input: ArticleFormValues): Promise<SaveResult> {
  await requireAdmin();

  const parsed = ArticleInput.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }
  const { id, publishedAt, ...rest } = parsed.data;

  // Enforce a single featured article.
  if (rest.featured) {
    await prisma.article.updateMany({
      where: id ? { featured: true, NOT: { id } } : { featured: true },
      data: { featured: false },
    });
  }

  const data = { ...rest, publishedAt: new Date(publishedAt) };

  try {
    const saved = id
      ? await prisma.article.update({ where: { id }, data })
      : await prisma.article.create({ data });

    revalidatePath('/knowledge');
    revalidatePath(`/knowledge/${saved.slug}`);
    revalidatePath('/admin/articles');
    return { ok: true, id: saved.id };
  } catch (e) {
    const msg = String(e);
    if (msg.includes('Unique constraint') || msg.includes('P2002')) {
      return { ok: false, error: 'That slug is already used by another article.' };
    }
    return { ok: false, error: 'Could not save the article.' };
  }
}

export async function deleteArticle(id: string): Promise<{ ok: boolean }> {
  await requireAdmin();
  const a = await prisma.article.findUnique({ where: { id } });
  await prisma.article.delete({ where: { id } });
  if (a) revalidatePath(`/knowledge/${a.slug}`);
  revalidatePath('/knowledge');
  revalidatePath('/admin/articles');
  return { ok: true };
}

const ALLOWED = new Map<string, string>([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/avif', 'avif'],
  ['image/gif', 'gif'],
]);

export async function uploadArticleImage(
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

  const dir = path.join(process.cwd(), 'public', 'uploads', 'articles');
  await mkdir(dir, { recursive: true });
  const name = `${randomUUID()}.${ext}`;
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  return { ok: true, url: `/uploads/articles/${name}` };
}
