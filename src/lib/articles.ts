import 'server-only';
import { prisma } from '@/lib/prisma';
import type { articles as Article, articles_status as ArticleStatus } from '@prisma/client';

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
    date: fmtDate(a.createdAt, lang),
    title: lang === 'de' ? (a.titleDe || a.titleEn) : a.titleEn,
    desc: lang === 'de' ? (a.descDe || a.descEn) : a.descEn,
    image: a.heroImage || '',
    content: lang === 'de' ? (a.contentDe || a.contentEn) : a.contentEn,
    featured: a.featured,
  };
}

/** All published articles, newest first (featured one first if present). */
export async function getPublishedArticles(): Promise<Article[]> {
  return (prisma as any).articles.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return (prisma as any).articles.findUnique({ where: { slug } });
}

/** Admin: every article regardless of status. */
export async function getAllArticles(): Promise<Article[]> {
  return (prisma as any).articles.findMany({
    orderBy: [{ createdAt: 'desc' }],
  });
}

export async function getArticleById(id: string): Promise<Article | null> {
  return (prisma as any).articles.findUnique({ where: { id } });
}

export const ARTICLE_STATUSES: ArticleStatus[] = ['DRAFT', 'PUBLISHED'];
