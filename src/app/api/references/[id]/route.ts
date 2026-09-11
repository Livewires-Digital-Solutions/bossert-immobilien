/**
 * GET /api/references/[id] — single reference by slug, for the detail page.
 */
import { NextResponse } from 'next/server';
import { withBackendGuard } from '@/lib/backend-config';
import { getReferenceBySlug, parseStats } from '@/lib/references';

export const dynamic = 'force-dynamic';

export const GET = withBackendGuard(async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = await getReferenceBySlug(id);
  if (!r) return NextResponse.json({ reference: null }, { status: 404 });

  const reference = {
    id: r.slug,
    location: r.location,
    type: r.type,
    heroImage: r.heroImage ?? '',
    size: r.size ?? 'square',
    featured: r.featured,
    stats: parseStats(r.statsJson),
    images: r.reference_images.map((img) => img.url),
    en: {
      title: r.titleEn,
      description: r.descriptionEn,
      fullDescription: r.fullDescEn || r.descriptionEn,
      features: r.reference_features.map((f) => f.featureEn),
    },
    de: {
      title: r.titleDe || r.titleEn,
      description: r.descriptionDe || r.descriptionEn,
      fullDescription: r.fullDescDe || r.fullDescEn || r.descriptionDe || r.descriptionEn,
      features: r.reference_features.map((f) => f.featureDe || f.featureEn),
    },
  };
  return NextResponse.json({ reference });
});
