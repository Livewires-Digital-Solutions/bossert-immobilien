/**
 * GET /api/articles — published Knowledge articles, both languages, for the feed.
 */
import { NextResponse } from 'next/server';
import { getPublishedArticles } from '@/lib/articles';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rows = await getPublishedArticles();
  const articles = rows.map((a) => ({
    slug: a.slug,
    category: a.category,
    image: a.coverImage,
    publishedAt: a.publishedAt.toISOString(),
    featured: a.featured,
    en: { title: a.titleEn, desc: a.excerptEn, content: a.bodyEn },
    de: { title: a.titleDe, desc: a.excerptDe, content: a.bodyDe },
  }));
  return NextResponse.json({ articles });
}
