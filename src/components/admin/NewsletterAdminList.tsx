'use client';

import { useLanguage } from '@/context/LanguageContext';
import admin from '@/app/admin/admin.module.css';
import styles from '@/app/admin/articles/articles.module.css';
import type { NewsletterSubscriber } from '@/lib/newsletter';

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export default function NewsletterAdminList({ subscribers }: { subscribers: NewsletterSubscriber[] }) {
  const { t } = useLanguage();
  const tt = t.admin.newsletter;

  return (
    <section>
      <div className={admin.eyebrow}>{tt.eyebrow}</div>
      <h1 className={admin.pageTitle}>{tt.title}</h1>
      <p className={admin.lead}>{tt.lead}</p>

      <div className={styles.topRow}>
        <div className={admin.resultCount}>
          {subscribers.length} {subscribers.length === 1 ? tt.resultCount_one : tt.resultCount_other}
        </div>
        <a href="/admin/newsletter/export" className={styles.newBtn}>
          {tt.exportBtn}
        </a>
      </div>

      <div className={admin.tableWrap}>
        <table className={admin.table}>
          <thead>
            <tr>
              <th>{tt.colEmail}</th>
              <th>{tt.colStatus}</th>
              <th>{tt.colSubscribedAt}</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 ? (
              <tr className={admin.emptyRow}>
                <td colSpan={3}>{tt.empty}</td>
              </tr>
            ) : (
              subscribers.map((s) => (
                <tr key={s.id}>
                  <td className={admin.cellName}>{s.email}</td>
                  <td>
                    <span className={`${styles.badge} ${s.isActive ? styles.badgePublished : ''}`}>
                      {s.isActive ? t.admin.common.active : t.admin.common.inactive}
                    </span>
                  </td>
                  <td className={admin.cellMuted}>{dateFmt.format(s.subscribedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
