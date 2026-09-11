import Link from 'next/link';
import { requireAdmin } from '@/lib/require-admin';
import {
  listContactSubmissions,
  getContactCounts,
  type ContactStatus,
} from '@/lib/contact-submissions';
import admin from '../admin.module.css';
import styles from './contact.module.css';

export const metadata = { title: 'Inquiries · Bossert Admin' };

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

const TABS: { key: ContactStatus | 'ALL'; label: string }[] = [
  { key: 'NEW', label: 'New' },
  { key: 'READ', label: 'Read' },
  { key: 'RESPONDED', label: 'Responded' },
  { key: 'ALL', label: 'All' },
];

function StatusBadge({ status }: { status: ContactStatus }) {
  const cls =
    status === 'NEW'
      ? `${styles.badge} ${styles.badgeNew}`
      : status === 'RESPONDED'
        ? `${styles.badge} ${styles.badgeResponded}`
        : styles.badge;
  return <span className={cls}>{status}</span>;
}

export default async function AdminContactPage(props: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  await requireAdmin();

  const { status: statusParam, q } = await props.searchParams;
  const query = (q ?? '').trim();
  const status = (
    ['NEW', 'READ', 'RESPONDED', 'ALL'].includes(statusParam ?? '') ? statusParam : 'NEW'
  ) as ContactStatus | 'ALL';

  const [submissions, counts] = await Promise.all([
    listContactSubmissions({ status, q: query }),
    getContactCounts(),
  ]);

  const countFor = (k: ContactStatus | 'ALL') =>
    k === 'ALL'
      ? counts.total
      : k === 'NEW'
        ? counts.new
        : k === 'READ'
          ? counts.read
          : counts.responded;

  const buildHref = (next: ContactStatus | 'ALL') => {
    const p = new URLSearchParams();
    p.set('status', next);
    if (query) p.set('q', query);
    return `/admin/contact?${p.toString()}`;
  };

  return (
    <section>
      <div className={admin.eyebrow}>Enquiries</div>
      <h1 className={admin.pageTitle}>Inquiries</h1>
      <p className={admin.lead}>
        Contact-form submissions from the website. New enquiries are highlighted until opened.
      </p>

      <div className={styles.topRow}>
        <div className={styles.filters}>
          {TABS.map((tab) => (
            <Link
              key={tab.key}
              href={buildHref(tab.key)}
              className={`${styles.filterTab} ${status === tab.key ? styles.active : ''}`}
            >
              {tab.label}
              <span className={styles.filterCount}>{countFor(tab.key)}</span>
            </Link>
          ))}
        </div>

        <form className={admin.searchRow} method="get" action="/admin/contact" style={{ margin: 0 }}>
          <input type="hidden" name="status" value={status} />
          <input
            className={admin.searchInput}
            type="search"
            name="q"
            placeholder="Search name, email, message…"
            defaultValue={query}
            aria-label="Search inquiries"
          />
          <button className={admin.searchBtn} type="submit">
            Search
          </button>
          {query && (
            <Link className={admin.searchClear} href={buildHref(status)}>
              Clear
            </Link>
          )}
        </form>
      </div>

      <div className={admin.resultCount}>
        {submissions.length} {submissions.length === 1 ? 'inquiry' : 'inquiries'}
        {query ? ` matching “${query}”` : ''}
      </div>

      <div className={admin.tableWrap}>
        <table className={admin.table}>
          <thead>
            <tr>
              <th>From</th>
              <th>Type</th>
              <th>Message</th>
              <th>Source</th>
              <th>Status</th>
              <th>Received</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr className={admin.emptyRow}>
                <td colSpan={6}>No inquiries here yet.</td>
              </tr>
            ) : (
              submissions.map((s) => (
                <tr key={s.id} className={s.status === 'NEW' ? styles.rowNew : ''}>
                  <td className={admin.cellName}>
                    <Link href={`/admin/contact/${s.id}`} className={styles.rowLink}>
                      {s.name}
                    </Link>
                    <div className={admin.cellMuted} style={{ fontSize: '0.72rem' }}>
                      {s.email ?? s.phone ?? '—'}
                    </div>
                  </td>
                  <td className={admin.cellMuted}>{s.inquiryType ?? '—'}</td>
                  <td>
                    <div className={styles.msgPreview}>{s.message}</div>
                  </td>
                  <td className={admin.cellMuted}>{s.source}</td>
                  <td>
                    <StatusBadge status={s.status} />
                  </td>
                  <td className={admin.cellMuted}>{dateFmt.format(s.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
