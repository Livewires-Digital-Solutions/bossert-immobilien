import { requireAdmin } from '@/lib/require-admin';
import { prisma } from '@/lib/prisma';
import styles from './admin.module.css';

export const metadata = { title: 'Dashboard · Bossert Admin' };

export default async function AdminDashboardPage() {
  const session = await requireAdmin();

  const [userCount, adminCount, newThisWeek] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: { in: ['ADMIN', 'SUPERADMIN'] } } }),
    prisma.user.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
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
          <div className={styles.cardValue}>—</div>
          <div className={styles.cardHint}>Coming soon</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Open enquiries</div>
          <div className={styles.cardValue}>—</div>
          <div className={styles.cardHint}>Coming soon</div>
        </div>
      </div>

      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Listings</h2>
        <p className={styles.panelText}>
          Create, edit and publish property listings. Not yet wired up in this build.
        </p>
      </div>
      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Enquiries</h2>
        <p className={styles.panelText}>
          Contact-form submissions and their status. Not yet wired up in this build.
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
