'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import admin from '@/app/admin/admin.module.css';
import styles from '@/app/admin/articles/articles.module.css';
import type { Testimonial } from '@/lib/testimonials';

export default function TestimonialsAdminList({ testimonials }: { testimonials: Testimonial[] }) {
  const { t } = useLanguage();
  const tt = t.admin.testimonials;

  return (
    <section>
      <div className={admin.eyebrow}>{tt.eyebrow}</div>
      <h1 className={admin.pageTitle}>{tt.title}</h1>
      <p className={admin.lead}>{tt.lead}</p>

      <div className={styles.topRow}>
        <div className={admin.resultCount}>{testimonials.length}</div>
        <Link href="/admin/testimonials/new" className={styles.newBtn}>
          {tt.newBtn}
        </Link>
      </div>

      <div className={admin.tableWrap}>
        <table className={admin.table}>
          <thead>
            <tr>
              <th>{tt.colAuthor}</th>
              <th>{tt.colLocation}</th>
              <th>{tt.colStatus}</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 ? (
              <tr className={admin.emptyRow}>
                <td colSpan={3}>{tt.empty}</td>
              </tr>
            ) : (
              testimonials.map((item) => (
                <tr key={item.id}>
                  <td className={admin.cellName}>
                    <Link href={`/admin/testimonials/${item.id}`} className={styles.rowLink}>
                      {item.author}
                    </Link>
                  </td>
                  <td className={admin.cellMuted}>{item.location}</td>
                  <td>
                    <span className={`${styles.badge} ${item.isActive ? styles.badgePublished : ''}`}>
                      {item.isActive ? t.admin.common.active : t.admin.common.inactive}
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
