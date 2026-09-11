/**
 * GET /api/testimonials — active testimonials, both languages.
 */
import { NextResponse } from 'next/server';
import { getActiveTestimonials } from '@/lib/testimonials';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rows = await getActiveTestimonials();
  const testimonials = rows.map((t) => ({
    id: t.id,
    author: t.author,
    location: t.location,
    image: t.image ?? '',
    en: { quote: t.quoteEn },
    de: { quote: t.quoteDe || t.quoteEn },
  }));
  return NextResponse.json({ testimonials });
}
