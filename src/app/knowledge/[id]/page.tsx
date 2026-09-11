import React from 'react';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getPublishedArticles } from '@/lib/articles';
import KnowledgeDetailClient from './KnowledgeDetailClient';
import type { ApiArticle } from '@/lib/article-client';

export default async function KnowledgeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let a = await getArticleBySlug(id);
  if ((!a || a.status !== 'PUBLISHED') && id === 'featured') {
    a = (await getPublishedArticles()).find((x) => x.featured) ?? null;
  }
  if (!a || a.status !== 'PUBLISHED') notFound();

  const article: ApiArticle = {
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
  };

  return <KnowledgeDetailClient article={article} />;
}
