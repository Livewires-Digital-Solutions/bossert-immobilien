import Link from 'next/link';
import { requireAdmin } from '@/lib/require-admin';
import { prisma } from '@/lib/prisma';
import { isAdminEmail } from '@/lib/admin-emails';
import styles from '../admin.module.css';

export const metadata = { title: 'Users · Bossert Admin' };

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export default async function AdminUsersPage(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdmin();

  const { q } = await props.searchParams;
  const query = (q ?? '').trim();

  const users = await (prisma as any).users.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query } },
            { email: { contains: query } },
          ],
        }
      : undefined,
    orderBy: { createdAt: 'desc' },
    take: 200,
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  return (
    <section>
      <div className={styles.eyebrow}>Directory</div>
      <h1 className={styles.pageTitle}>Users</h1>
      <p className={styles.lead}>
        Everyone who has registered an account. Search by name or email address.
      </p>

      <form className={styles.searchRow} method="get" action="/admin/users">
        <input
          className={styles.searchInput}
          type="search"
          name="q"
          placeholder="Search name or email…"
          defaultValue={query}
          aria-label="Search users"
        />
        <button className={styles.searchBtn} type="submit">
          Search
        </button>
        {query && (
          <Link className={styles.searchClear} href="/admin/users">
            Clear
          </Link>
        )}
      </form>

      <div className={styles.resultCount}>
        {users.length} {users.length === 1 ? 'user' : 'users'}
        {query ? ` matching “${query}”` : ''}
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr className={styles.emptyRow}>
                <td colSpan={4}>No users found.</td>
              </tr>
            ) : (
              users.map((u) => {
                const elevated =
                  u.role === 'ADMIN' || u.role === 'SUPER_ADMIN' || isAdminEmail(u.email);
                return (
                  <tr key={u.id}>
                    <td className={styles.cellName}>{u.name ?? '—'}</td>
                    <td className={styles.cellMuted}>{u.email}</td>
                    <td>
                      <span className={`${styles.tag} ${elevated ? styles.tagAdmin : ''}`}>
                        {u.role === 'VIEWER' && elevated ? 'ADMIN (email)' : u.role}
                      </span>
                    </td>
                    <td className={styles.cellMuted}>{dateFmt.format(u.createdAt)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
