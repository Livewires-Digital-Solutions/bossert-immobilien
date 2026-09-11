'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import admin from '@/app/admin/admin.module.css';
import styles from '@/app/admin/articles/articles.module.css';
import type { ReferenceWithRelations } from '@/lib/references';

export default function ReferencesAdminList({ references }: { references: ReferenceWithRelations[] }) {
  const { t } = useLanguage();
  const tr = t.admin.references;

  return (
    <section>
      <div className={admin.eyebrow}>{tr.eyebrow}</div>
      <h1 className={admin.pageTitle}>{tr.title}</h1>
      <p className={admin.lead}>{tr.lead}</p>

      <div className={styles.topRow}>
        <div className={admin.resultCount}>
          {references.length} {references.length === 1 ? tr.resultCount_one : tr.resultCount_other}
        </div>
        <Link href="/admin/references/new" className={styles.newBtn}>
          {tr.newBtn}
        </Link>
      </div>

      <div className={admin.tableWrap}>
        <table className={admin.table}>
          <thead>
            <tr>
              <th>{tr.colTitle}</th>
              <th>{tr.colLocation}</th>
              <th>{tr.colType}</th>
              <th>{tr.colStatus}</th>
            </tr>
          </thead>
          <tbody>
            {references.length === 0 ? (
              <tr className={admin.emptyRow}>
                <td colSpan={4}>{tr.empty}</td>
              </tr>
            ) : (
              references.map((r) => (
                <tr key={r.id}>
                  <td className={admin.cellName}>
                    <Link href={`/admin/references/${r.id}`} className={styles.rowLink}>
                      {r.featured && <span className={styles.star}>★ </span>}
                      {r.titleEn}
                    </Link>
                    <div className={admin.cellMuted} style={{ fontSize: '0.72rem' }}>
                      /references/{r.slug}
                    </div>
                  </td>
                  <td className={admin.cellMuted}>{r.location}</td>
                  <td className={admin.cellMuted}>{r.type}</td>
                  <td>
                    <span className={`${styles.badge} ${r.isActive ? styles.badgePublished : ''}`}>
                      {r.isActive ? t.admin.common.active : t.admin.common.inactive}
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
