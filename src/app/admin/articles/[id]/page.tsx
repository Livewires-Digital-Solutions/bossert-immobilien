import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/require-admin';
import { getArticleById } from '@/lib/articles';
import ArticleEditor from '@/components/admin/ArticleEditor';
import type { ArticleFormValues } from '../actions';
import admin from '../../admin.module.css';

export const metadata = { title: 'Edit article · Bossert Admin' };

export default async function EditArticlePage(props: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await props.params;
  const a = await getArticleById(id);
  if (!a) notFound();

  const initial: ArticleFormValues & { id: string } = {
    id: a.id,
    slug: a.slug,
    category: a.category,
    coverImage: a.coverImage,
    status: a.status,
    featured: a.featured,
    publishedAt: a.publishedAt.toISOString().slice(0, 10),
    titleEn: a.titleEn,
    titleDe: a.titleDe,
    excerptEn: a.excerptEn,
    excerptDe: a.excerptDe,
    bodyEn: a.bodyEn,
    bodyDe: a.bodyDe,
  };

  return (
    <section>
      <div className={admin.eyebrow}>
        <Link href="/admin/articles" style={{ color: 'inherit' }}>
          Articles
        </Link>{' '}
        / Edit
      </div>
      <h1 className={admin.pageTitle}>{a.titleEn}</h1>
      <ArticleEditor initial={initial} />
    </section>
  );
}
