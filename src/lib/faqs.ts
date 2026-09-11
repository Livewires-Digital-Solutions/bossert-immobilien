import 'server-only';
import { prisma } from '@/lib/prisma';
import type { faqs as Faq } from '@prisma/client';

export type { Faq };

/** Public: active FAQs, in editorial order. */
export async function getActiveFaqs(): Promise<Faq[]> {
  return prisma.faqs.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });
}

/** Admin: every FAQ regardless of active state. */
export async function getAllFaqs(): Promise<Faq[]> {
  return prisma.faqs.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });
}

export async function getFaqById(id: string): Promise<Faq | null> {
  return prisma.faqs.findUnique({ where: { id } });
}
