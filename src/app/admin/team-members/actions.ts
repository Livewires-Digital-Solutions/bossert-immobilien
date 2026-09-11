'use server';

import { randomUUID } from 'node:crypto';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

const TeamMemberInput = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1).max(120),
  titleEn: z.string().trim().min(1).max(200),
  titleDe: z.string().trim().max(200).optional().or(z.literal('')),
  quoteEn: z.string().trim().max(1000).optional().or(z.literal('')),
  quoteDe: z.string().trim().max(1000).optional().or(z.literal('')),
  image: z.string().trim().max(500).optional().or(z.literal('')),
  order: z.number().int(),
  isActive: z.boolean(),
});

export type TeamMemberFormValues = z.infer<typeof TeamMemberInput>;
export type SaveResult = { ok: true; id: string } | { ok: false; error: string };

export async function saveTeamMember(input: TeamMemberFormValues): Promise<SaveResult> {
  await requireAdmin();
  const parsed = TeamMemberInput.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }
  const { id, ...rest } = parsed.data;
  const data = {
    ...rest,
    titleDe: rest.titleDe || null,
    quoteEn: rest.quoteEn || null,
    quoteDe: rest.quoteDe || null,
    image: rest.image || null,
    updatedAt: new Date(),
  };

  try {
    const saved = id
      ? await prisma.team_members.update({ where: { id }, data })
      : await prisma.team_members.create({ data: { ...data, id: createId() } });

    revalidatePath('/about');
    revalidatePath('/admin/team-members');
    return { ok: true, id: saved.id };
  } catch {
    return { ok: false, error: 'Could not save the team member.' };
  }
}

export async function deleteTeamMember(id: string): Promise<{ ok: boolean }> {
  await requireAdmin();
  await prisma.team_members.delete({ where: { id } });
  revalidatePath('/about');
  revalidatePath('/admin/team-members');
  return { ok: true };
}

const ALLOWED = new Map<string, string>([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/avif', 'avif'],
  ['image/gif', 'gif'],
]);

export async function uploadTeamMemberPhoto(
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

  const dir = path.join(process.cwd(), 'public', 'uploads', 'team');
  await mkdir(dir, { recursive: true });
  const name = `${randomUUID()}.${ext}`;
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  return { ok: true, url: `/uploads/team/${name}` };
}
