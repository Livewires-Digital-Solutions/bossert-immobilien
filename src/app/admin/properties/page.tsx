import Link from 'next/link';
import { requireAdmin } from '@/lib/require-admin';
import { hasOnOfficeCredentials } from '@/lib/onoffice';
import { listAdminProperties } from '@/lib/onoffice-properties';
import PropertyImportForm from '@/components/admin/PropertyImportForm';
import admin from '../admin.module.css';
import styles from './properties.module.css';

export const metadata = { title: 'Properties · Bossert Admin' };

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === 'PUBLISHED'
      ? `${styles.badge} ${styles.badgePublished}`
      : status === 'ARCHIVED'
        ? `${styles.badge} ${styles.badgeArchived}`
        : styles.badge;
  return <span className={cls}>{status}</span>;
}

export default async function AdminPropertiesPage() {
  await requireAdmin();
  const properties = await listAdminProperties();
  const credsOk = hasOnOfficeCredentials();

  return (
    <section>
      <div className={admin.eyebrow}>Listings</div>
      <h1 className={admin.pageTitle}>Properties</h1>
      <p className={admin.lead}>
        Import estates from onOffice by their Internal or External ID, then choose
        field by field what the public site is allowed to show.
      </p>

      {!credsOk && (
        <div className={styles.notice}>
          onOffice API credentials are not configured. Set <code>ONOFFICE_TOKEN</code> and{' '}
          <code>ONOFFICE_SECRET</code> in <code>.env.local</code> to enable importing.
        </div>
      )}

      <PropertyImportForm disabled={!credsOk} />

      <div className={admin.resultCount}>
        {properties.length} {properties.length === 1 ? 'property' : 'properties'} imported
      </div>

      <div className={admin.tableWrap}>
        <table className={admin.table}>
          <thead>
            <tr>
              <th>Property</th>
              <th>IDs</th>
              <th>Fields shown</th>
              <th>Status</th>
              <th>Last synced</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr className={admin.emptyRow}>
                <td colSpan={5}>Nothing imported yet. Use the form above.</td>
              </tr>
            ) : (
              properties.map((p) => (
                <tr key={p.id}>
                  <td className={admin.cellName}>
                    <Link href={`/admin/properties/${p.id}`} className={styles.rowLink}>
                      {p.title ?? 'Untitled estate'}
                    </Link>
                    <div className={admin.cellMuted} style={{ fontSize: '0.72rem' }}>
                      {[p.city, p.marketingType, p.priceLabel].filter(Boolean).join(' · ')}
                    </div>
                  </td>
                  <td className={styles.idMono}>
                    int {p.internalId}
                    <br />
                    ext {p.externalId ?? '—'}
                  </td>
                  <td className={admin.cellMuted}>
                    {p.visibleCount} / {p.totalCount}
                  </td>
                  <td>
                    <StatusBadge status={p.status} />
                  </td>
                  <td className={admin.cellMuted}>{dateFmt.format(p.lastSyncedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
