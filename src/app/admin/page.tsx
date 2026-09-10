import { requireAdmin } from '@/lib/require-admin';
import { prisma } from '@/lib/prisma';
import styles from './admin.module.css';

export default async function AdminDashboardPage() {
  const session = await requireAdmin();

  const [userCount, propertyCount, publishedCount] = await Promise.all([
    prisma.user.count(),
    prisma.property.count(),
    prisma.property.count({ where: { status: 'PUBLISHED' } }),
  ]);

  return (
    <section>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      <p className={styles.lead}>
        Welcome, {session.user.name ?? session.user.email}. Listing management tools will live here.
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Registered users</div>
          <div className={styles.cardValue}>{userCount}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Properties</div>
          <div className={styles.cardValue}>{propertyCount}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Published</div>
          <div className={styles.cardValue}>{publishedCount}</div>
        </div>
      </div>
    </section>
  );
}
