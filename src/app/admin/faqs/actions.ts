'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

const FaqInput = z.object({
  id: z.string().optional(),
  questionEn: z.string().trim().min(1).max(300),
  questionDe: z.string().trim().max(300).optional().or(z.literal('')),
  answerEn: z.string().trim().min(1).max(3000),
  answerDe: z.string().trim().max(3000).optional().or(z.literal('')),
  order: z.number().int(),
  isActive: z.boolean(),
});

export type FaqFormValues = z.infer<typeof FaqInput>;
export type SaveResult = { ok: true; id: string } | { ok: false; error: string };

export async function saveFaq(input: FaqFormValues): Promise<SaveResult> {
  await requireAdmin();
  const parsed = FaqInput.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }
  const { id, ...rest } = parsed.data;
  const data = { ...rest, questionDe: rest.questionDe || null, answerDe: rest.answerDe || null, updatedAt: new Date() };

  try {
    const saved = id
      ? await prisma.faqs.update({ where: { id }, data })
      : await prisma.faqs.create({ data: { ...data, id: createId() } });

    revalidatePath('/contact');
    revalidatePath('/admin/faqs');
    return { ok: true, id: saved.id };
  } catch {
    return { ok: false, error: 'Could not save the FAQ.' };
  }
}

export async function deleteFaq(id: string): Promise<{ ok: boolean }> {
  await requireAdmin();
  await prisma.faqs.delete({ where: { id } });
  revalidatePath('/contact');
  revalidatePath('/admin/faqs');
  return { ok: true };
}
