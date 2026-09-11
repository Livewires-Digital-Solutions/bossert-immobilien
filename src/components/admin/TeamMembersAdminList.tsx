'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import admin from '@/app/admin/admin.module.css';
import styles from '@/app/admin/articles/articles.module.css';
import type { TeamMember } from '@/lib/team-members';

export default function TeamMembersAdminList({ members }: { members: TeamMember[] }) {
  const { t } = useLanguage();
  const tt = t.admin.teamMembers;

  return (
    <section>
      <div className={admin.eyebrow}>{tt.eyebrow}</div>
      <h1 className={admin.pageTitle}>{tt.title}</h1>
      <p className={admin.lead}>{tt.lead}</p>

      <div className={styles.topRow}>
        <div className={admin.resultCount}>{members.length}</div>
        <Link href="/admin/team-members/new" className={styles.newBtn}>
          {tt.newBtn}
        </Link>
      </div>

      <div className={admin.tableWrap}>
        <table className={admin.table}>
          <thead>
            <tr>
              <th>{tt.colName}</th>
              <th>{tt.colTitle}</th>
              <th>{tt.colStatus}</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr className={admin.emptyRow}>
                <td colSpan={3}>{tt.empty}</td>
              </tr>
            ) : (
              members.map((m) => (
                <tr key={m.id}>
                  <td className={admin.cellName}>
                    <Link href={`/admin/team-members/${m.id}`} className={styles.rowLink}>
                      {m.name}
                    </Link>
                  </td>
                  <td className={admin.cellMuted}>{m.titleEn}</td>
                  <td>
                    <span className={`${styles.badge} ${m.isActive ? styles.badgePublished : ''}`}>
                      {m.isActive ? t.admin.common.active : t.admin.common.inactive}
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
