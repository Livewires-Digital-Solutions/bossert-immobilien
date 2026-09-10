import Link from 'next/link';
import { requireAdmin } from '@/lib/require-admin';
import ArticleEditor from '@/components/admin/ArticleEditor';
import admin from '../../admin.module.css';

export const metadata = { title: 'New article · Bossert Admin' };

export default async function NewArticlePage() {
  await requireAdmin();
  return (
    <section>
      <div className={admin.eyebrow}>
        <Link href="/admin/articles" style={{ color: 'inherit' }}>
          Articles
        </Link>{' '}
        / New
      </div>
      <h1 className={admin.pageTitle}>New article</h1>
      <ArticleEditor />
    </section>
  );
}
