'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

const TestimonialInput = z.object({
  id: z.string().optional(),
  quoteEn: z.string().trim().min(1).max(2000),
  quoteDe: z.string().trim().max(2000).optional().or(z.literal('')),
  author: z.string().trim().min(1).max(120),
  location: z.string().trim().min(1).max(120),
  image: z.string().trim().max(500).optional().or(z.literal('')),
  order: z.number().int(),
  isActive: z.boolean(),
});

export type TestimonialFormValues = z.infer<typeof TestimonialInput>;
export type SaveResult = { ok: true; id: string } | { ok: false; error: string };

export async function saveTestimonial(input: TestimonialFormValues): Promise<SaveResult> {
  await requireAdmin();
  const parsed = TestimonialInput.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }
  const { id, ...rest } = parsed.data;
  const data = { ...rest, quoteDe: rest.quoteDe || null, image: rest.image || null, updatedAt: new Date() };

  try {
    const saved = id
      ? await prisma.testimonials.update({ where: { id }, data })
      : await prisma.testimonials.create({ data: { ...data, id: createId() } });

    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { ok: true, id: saved.id };
  } catch {
    return { ok: false, error: 'Could not save the testimonial.' };
  }
}

export async function deleteTestimonial(id: string): Promise<{ ok: boolean }> {
  await requireAdmin();
  await prisma.testimonials.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/admin/testimonials');
  return { ok: true };
}
