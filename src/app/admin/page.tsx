import Link from 'next/link';
import { requireAdmin } from '@/lib/require-admin';
import { prisma } from '@/lib/prisma';
import styles from './admin.module.css';

export const metadata = { title: 'Dashboard · Bossert Admin' };

import { isBackendEnabled } from '@/lib/backend-config';

export default async function AdminDashboardPage() {
  const session = await requireAdmin();

  if (!isBackendEnabled()) {
    return (
      <section>
        <div className={styles.eyebrow}>Overview</div>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <div style={{ padding: '2rem', backgroundColor: 'var(--cream)', borderRadius: '8px', border: '1px solid #f0e6d2', marginTop: '2rem' }}>
          <h2 style={{ color: 'var(--navy)', marginBottom: '1rem', fontSize: '1.5rem' }}>Backend Disabled</h2>
          <p style={{ color: 'var(--navy)', opacity: 0.8, lineHeight: 1.6 }}>
            The backend is currently running in safe mode (`BACKEND_ENABLED=false`). Database queries and API integrations are disabled.
          </p>
        </div>
      </section>
    );
  }

  const [
    userCount,
    adminCount,
    newThisWeek,
    publishedListings,
    importedListings,
    openEnquiries,
    totalEnquiries,
  ] = await Promise.all([
    (prisma as any).users.count(),
    (prisma as any).users.count({ where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } } }),
    (prisma as any).users.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
    (prisma as any).onoffice_properties.count({ where: { status: 'PUBLISHED' } }),
    (prisma as any).onoffice_properties.count(),
    (prisma as any).contact_submissions.count({ where: { status: 'NEW' } }),
    (prisma as any).contact_submissions.count(),
  ]);

  return (
    <section>
      <div className={styles.eyebrow}>Overview</div>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      <p className={styles.lead}>
        Welcome back, {session.user.name ?? session.user.email}. This is a placeholder
        overview — listing, content and enquiry management will live here.
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Registered users</div>
          <div className={styles.cardValue}>{userCount}</div>
          <div className={styles.cardHint}>+{newThisWeek} in the last 7 days</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Administrators</div>
          <div className={styles.cardValue}>{adminCount}</div>
          <div className={styles.cardHint}>Role or allowlisted email</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Active listings</div>
          <div className={styles.cardValue}>{publishedListings}</div>
          <div className={styles.cardHint}>{importedListings} imported from onOffice</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Open enquiries</div>
          <div className={styles.cardValue}>{openEnquiries}</div>
          <div className={styles.cardHint}>{totalEnquiries} received in total</div>
        </div>
      </div>

      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Listings</h2>
        <p className={styles.panelText}>
          Import estates from onOffice and control field-by-field what the public site
          shows in <Link href="/admin/properties">Properties</Link>.
        </p>
      </div>
      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Enquiries</h2>
        <p className={styles.panelText}>
          Website contact-form submissions, with status tracking, in{' '}
          <Link href="/admin/contact">Inquiries</Link>.
        </p>
      </div>
      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Content</h2>
        <p className={styles.panelText}>
          Knowledge articles, references and team members. Not yet wired up in this build.
        </p>
      </div>
    </section>
  );
}
