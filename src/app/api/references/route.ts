/**
 * GET /api/references — active references (featured + archive gallery), both languages.
 */
import { NextResponse } from 'next/server';
import { getActiveReferences, parseStats } from '@/lib/references';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rows = await getActiveReferences();
  const references = rows.map((r) => ({
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
  }));
  return NextResponse.json({ references });
}
