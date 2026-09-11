import 'server-only';
import { prisma } from '@/lib/prisma';
import type { references as Reference, reference_images, reference_features } from '@prisma/client';

export type { Reference };

export type ReferenceWithRelations = Reference & {
  reference_images: reference_images[];
  reference_features: reference_features[];
};

const orderedIncludes = {
  reference_images: { orderBy: { order: 'asc' as const } },
  reference_features: { orderBy: { order: 'asc' as const } },
};

/** Public: active references, ordered for the archive gallery (featured first, then `order`). */
export async function getActiveReferences(): Promise<ReferenceWithRelations[]> {
  return prisma.references.findMany({
    where: { isActive: true },
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    include: orderedIncludes,
  });
}

/** Public: single reference by slug (used by the detail page). */
export async function getReferenceBySlug(slug: string): Promise<ReferenceWithRelations | null> {
  return prisma.references.findUnique({
    where: { slug },
    include: orderedIncludes,
  });
}

/** Admin: every reference regardless of active state. */
export async function getAllReferences(): Promise<ReferenceWithRelations[]> {
  return prisma.references.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    include: orderedIncludes,
  });
}

export async function getReferenceById(id: string): Promise<ReferenceWithRelations | null> {
  return prisma.references.findUnique({
    where: { id },
    include: orderedIncludes,
  });
}

export interface ReferenceStat {
  label: string;
  value: string;
}

export function parseStats(statsJson: string | null): ReferenceStat[] {
  if (!statsJson) return [];
  try {
    const parsed = JSON.parse(statsJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
