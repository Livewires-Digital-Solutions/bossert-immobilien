'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import admin from '@/app/admin/admin.module.css';
import styles from '@/app/admin/articles/articles.module.css';
import type { Faq } from '@/lib/faqs';

export default function FaqsAdminList({ faqs }: { faqs: Faq[] }) {
  const { t } = useLanguage();
  const tt = t.admin.faqs;

  return (
    <section>
      <div className={admin.eyebrow}>{tt.eyebrow}</div>
      <h1 className={admin.pageTitle}>{tt.title}</h1>
      <p className={admin.lead}>{tt.lead}</p>

      <div className={styles.topRow}>
        <div className={admin.resultCount}>{faqs.length}</div>
        <Link href="/admin/faqs/new" className={styles.newBtn}>
          {tt.newBtn}
        </Link>
      </div>

      <div className={admin.tableWrap}>
        <table className={admin.table}>
          <thead>
            <tr>
              <th>{tt.colQuestion}</th>
              <th>{tt.colStatus}</th>
            </tr>
          </thead>
          <tbody>
            {faqs.length === 0 ? (
              <tr className={admin.emptyRow}>
                <td colSpan={2}>{tt.empty}</td>
              </tr>
            ) : (
              faqs.map((f) => (
                <tr key={f.id}>
                  <td className={admin.cellName}>
                    <Link href={`/admin/faqs/${f.id}`} className={styles.rowLink}>
                      {f.questionEn}
                    </Link>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${f.isActive ? styles.badgePublished : ''}`}>
                      {f.isActive ? t.admin.common.active : t.admin.common.inactive}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
