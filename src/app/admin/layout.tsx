import Link from 'next/link';
import { requireAdmin } from '@/lib/require-admin';
import LogoutButton from './LogoutButton';
import styles from './admin.module.css';

export const metadata = {
  title: 'Admin · Bossert Immobilien',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>Bossert Admin</div>

        <nav className={styles.nav}>
          <Link href="/admin" className={`${styles.navItem} ${styles.active}`}>
            Dashboard
          </Link>
          <Link href="/" className={styles.navItem}>
            View site
          </Link>
        </nav>

        <div className={styles.user}>
          {session.user.name ?? session.user.email}
          <br />
          {session.user.email} · {session.user.role}
          <LogoutButton />
        </div>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
