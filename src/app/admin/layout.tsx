import { requireAdmin } from '@/lib/require-admin';
import AdminNav from './AdminNav';
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
        <div>
          <div className={styles.brandRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" className={styles.brandLogo} />
            <div>
              <div className={styles.brand}>Bossert</div>
              <div className={styles.brandSub}>Admin</div>
            </div>
          </div>
        </div>

        <AdminNav />

        <div className={styles.user}>
          <span className={styles.userName}>{session.user.name ?? 'Administrator'}</span>
          {session.user.email}
          <br />
          {session.user.role}
          <LogoutButton />
        </div>
      </aside>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
