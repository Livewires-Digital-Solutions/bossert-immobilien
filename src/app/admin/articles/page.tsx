import Link from 'next/link';
import { requireAdmin } from '@/lib/require-admin';
import { getAllArticles } from '@/lib/articles';
import admin from '../admin.module.css';
import styles from './articles.module.css';

export const metadata = { title: 'Articles · Bossert Admin' };

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export default async function AdminArticlesPage() {
  await requireAdmin();
  const articles = await getAllArticles();

  return (
    <section>
      <div className={admin.eyebrow}>Content</div>
      <h1 className={admin.pageTitle}>Articles</h1>
      <p className={admin.lead}>
        Posts shown on the Knowledge page. Each has an English and a German version.
      </p>

      <div className={styles.topRow}>
        <div className={admin.resultCount}>
          {articles.length} {articles.length === 1 ? 'article' : 'articles'}
        </div>
        <Link href="/admin/articles/new" className={styles.newBtn}>
          + New article
        </Link>
      </div>

      <div className={admin.tableWrap}>
        <table className={admin.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr className={admin.emptyRow}>
                <td colSpan={4}>No articles yet. Create your first one.</td>
              </tr>
            ) : (
              articles.map((a) => (
                <tr key={a.id}>
                  <td className={admin.cellName}>
                    <Link href={`/admin/articles/${a.id}`} className={styles.rowLink}>
                      {a.featured && <span className={styles.star}>★ </span>}
                      {a.titleEn}
                    </Link>
                    <div className={admin.cellMuted} style={{ fontSize: '0.72rem' }}>
                      /knowledge/{a.slug}
                    </div>
                  </td>
                  <td className={admin.cellMuted}>{a.category}</td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        a.status === 'PUBLISHED' ? styles.badgePublished : ''
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className={admin.cellMuted}>{dateFmt.format(a.publishedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
