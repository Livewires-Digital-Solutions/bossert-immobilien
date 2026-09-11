'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

const db = prisma as any;

export type ActionResult = { ok: true } | { ok: false; error: string };

const StatusInput = z.object({
  id: z.string().min(1),
  status: z.enum(['NEW', 'READ', 'RESPONDED']),
});

export async function setSubmissionStatus(
  input: z.infer<typeof StatusInput>,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = StatusInput.safeParse(input);
  if (!parsed.success) return { ok: false, error: 'Invalid input' };

  try {
    await db.contact_submissions.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status, updatedAt: new Date() },
    });
  } catch {
    return { ok: false, error: 'Submission not found.' };
  }

  revalidatePath('/admin/contact');
  revalidatePath(`/admin/contact/${parsed.data.id}`);
  revalidatePath('/admin');
  return { ok: true };
}

/** Mark a NEW submission as READ on first open. No-op if already touched. */
export async function markSubmissionRead(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!id) return { ok: false, error: 'Invalid input' };

  await db.contact_submissions.updateMany({
    where: { id, status: 'NEW' },
    data: { status: 'READ', updatedAt: new Date() },
  });

  revalidatePath('/admin/contact');
  revalidatePath('/admin');
  return { ok: true };
}

export async function deleteSubmission(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!id) return { ok: false, error: 'Invalid input' };

  try {
    await db.contact_submissions.delete({ where: { id } });
  } catch {
    return { ok: false, error: 'Submission not found.' };
  }

  revalidatePath('/admin/contact');
  revalidatePath('/admin');
  return { ok: true };
}
