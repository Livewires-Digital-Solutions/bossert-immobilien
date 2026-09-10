/** Shared client helpers for the DB-backed Knowledge articles (no server-only). */

export interface ApiArticle {
  slug: string;
  category: string;
  image: string;
  publishedAt: string;
  featured: boolean;
  en: { title: string; desc: string; content: string };
  de: { title: string; desc: string; content: string };
}

export interface FeedArticle {
  id: string; // slug
  category: string;
  date: string;
  title: string;
  desc: string;
  image: string;
  content: string; // HTML
  featured: boolean;
}

export function localizeArticle(a: ApiArticle, lang: 'en' | 'de'): FeedArticle {
  const l = lang === 'de' ? a.de : a.en;
  const date = new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
    month: 'long',
    year: 'numeric',
  })
    .format(new Date(a.publishedAt))
    .toUpperCase();
  return {
    id: a.slug,
    category: a.category,
    date,
    title: l.title,
    desc: l.desc,
    image: a.image,
    content: l.content,
    featured: a.featured,
  };
}
