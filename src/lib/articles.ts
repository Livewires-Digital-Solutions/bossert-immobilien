import 'server-only';
import { prisma } from '@/lib/prisma';
import type { Article, ArticleStatus } from '@prisma/client';

export type { Article };

export type Lang = 'en' | 'de';

/** Public shape consumed by the Knowledge feed / detail pages. */
export interface LocalizedArticle {
  id: string; // slug — used in URLs
  category: string;
  date: string; // formatted, upper-cased month + year
  title: string;
  desc: string;
  image: string;
  content: string; // HTML
  featured: boolean;
}

function fmtDate(d: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
    month: 'long',
    year: 'numeric',
  })
    .format(d)
    .toUpperCase();
}

export function localize(a: Article, lang: Lang): LocalizedArticle {
  return {
    id: a.slug,
    category: a.category,
    date: fmtDate(a.publishedAt, lang),
    title: lang === 'de' ? a.titleDe : a.titleEn,
    desc: lang === 'de' ? a.excerptDe : a.excerptEn,
    image: a.coverImage,
    content: lang === 'de' ? a.bodyDe : a.bodyEn,
    featured: a.featured,
  };
}

/** All published articles, newest first (featured one first if present). */
export async function getPublishedArticles(): Promise<Article[]> {
  return prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
  });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return prisma.article.findUnique({ where: { slug } });
}

/** Admin: every article regardless of status. */
export async function getAllArticles(): Promise<Article[]> {
  return prisma.article.findMany({
    orderBy: [{ publishedAt: 'desc' }],
  });
}

export async function getArticleById(id: string): Promise<Article | null> {
  return prisma.article.findUnique({ where: { id } });
}

export const ARTICLE_STATUSES: ArticleStatus[] = ['DRAFT', 'PUBLISHED'];
