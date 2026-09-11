import 'server-only';
import { prisma } from '@/lib/prisma';
import type { testimonials as Testimonial } from '@prisma/client';

export type { Testimonial };

/** Public: active testimonials, in editorial order. */
export async function getActiveTestimonials(): Promise<Testimonial[]> {
  return prisma.testimonials.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
}

/** Admin: every testimonial regardless of active state. */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  return prisma.testimonials.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  return prisma.testimonials.findUnique({ where: { id } });
}
