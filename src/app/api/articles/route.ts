/**
 * GET /api/articles — published Knowledge articles, both languages, for the feed.
 */
import { NextResponse } from 'next/server';
import { withBackendGuard } from '@/lib/backend-config';
import { getPublishedArticles } from '@/lib/articles';
import type { ApiArticle } from '@/lib/article-client';

export const dynamic = 'force-dynamic';

export const GET = withBackendGuard(async function GET() {
  const rows = await getPublishedArticles();
  const articles: ApiArticle[] = rows.map((a) => ({
    slug: a.slug,
    category: a.category,
    image: a.heroImage ?? '',
    publishedAt: new Date(a.date).toISOString(),
    featured: a.featured,
    en: { title: a.titleEn, desc: a.descEn, content: a.contentEn },
    de: {
      title: a.titleDe || a.titleEn,
      desc: a.descDe || a.descEn,
      content: a.contentDe || a.contentEn,
    },
  }));
  return NextResponse.json({ articles });
});
