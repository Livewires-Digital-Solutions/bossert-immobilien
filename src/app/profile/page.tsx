import Link from 'next/link';
import { requireUser } from '@/lib/require-user';
import { prisma } from '@/lib/prisma';
import LogoutButton from './LogoutButton';
import styles from './profile.module.css';

export default async function ProfilePage() {
  const session = await requireUser('/profile');

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, role: true, createdAt: true },
  });

  const joined = user?.createdAt
    ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(
        user.createdAt,
      )
    : '—';

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.eyebrow}>My Account</div>
        <h1 className={styles.title}>
          Hello, <span className={styles.serif}>{user?.name ?? 'there'}.</span>
        </h1>
        <p className={styles.lead}>
          Your personal dashboard. Saved properties, search alerts and enquiry history will
          appear here as you use the site.
        </p>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.cardHeadTitle}>Account details</span>
            <span>
              <LogoutButton />
              {session.user.isAdmin && (
                <Link href="/admin" className={styles.adminLink}>
                  Admin dashboard
                </Link>
              )}
            </span>
          </div>

          <div className={styles.detailGrid}>
            <div>
              <div className={styles.detailLabel}>Name</div>
              <div className={styles.detailValue}>{user?.name ?? '—'}</div>
            </div>
            <div>
              <div className={styles.detailLabel}>Email</div>
              <div className={styles.detailValue}>{user?.email}</div>
            </div>
            <div>
              <div className={styles.detailLabel}>Member since</div>
              <div className={styles.detailValue}>{joined}</div>
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Saved properties</div>
            <div className={styles.statValue}>0</div>
            <div className={styles.statHint}>Save listings to compare them later</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Search alerts</div>
            <div className={styles.statValue}>0</div>
            <div className={styles.statHint}>Get notified about new matches</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Enquiries</div>
            <div className={styles.statValue}>0</div>
            <div className={styles.statHint}>Your conversations with our advisors</div>
          </div>
        </div>

        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Saved properties</h2>
          <p className={styles.panelText}>
            You haven&apos;t saved any properties yet.{' '}
            <Link href="/properties" style={{ color: 'var(--bronze)' }}>
              Browse the collection
            </Link>
            .
          </p>
        </div>
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Recent activity</h2>
          <p className={styles.panelText}>Nothing to show yet.</p>
        </div>
      </div>
    </div>
  );
}
