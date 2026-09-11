import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/require-admin';
import { getContactSubmission } from '@/lib/contact-submissions';
import ContactDetailPanel from '@/components/admin/ContactDetailPanel';
import admin from '../../admin.module.css';
import styles from '../contact.module.css';

export const metadata = { title: 'Inquiry · Bossert Admin' };

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default async function AdminContactDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await props.params;
  const s = await getContactSubmission(id);
  if (!s) notFound();

  const meta: { label: string; value: React.ReactNode }[] = [
    { label: 'Email', value: s.email ? <a href={`mailto:${s.email}`}>{s.email}</a> : '—' },
    { label: 'Phone', value: s.phone ? <a href={`tel:${s.phone}`}>{s.phone}</a> : '—' },
    { label: 'Inquiry type', value: s.inquiryType ?? '—' },
    { label: 'Heard about us', value: s.heardAbout ?? '—' },
    { label: 'Source', value: s.source },
    { label: 'Received', value: dateFmt.format(s.createdAt) },
    { label: 'Last updated', value: dateFmt.format(s.updatedAt) },
  ];

  return (
    <section>
      <div className={admin.eyebrow}>
        <Link href="/admin/contact" style={{ color: 'inherit' }}>
          Inquiries
        </Link>{' '}
        / {s.name}
      </div>
      <h1 className={admin.pageTitle}>{s.name}</h1>

      <div className={styles.detailGrid}>
        <div className={styles.messageCard}>
          <div className={styles.messageLabel}>Message</div>
          <div className={styles.messageBody}>{s.message}</div>
        </div>

        <div className={styles.sideCard}>
          {meta.map((m) => (
            <div key={m.label} className={styles.metaRow}>
              <div className={styles.metaLabel}>{m.label}</div>
              <div className={styles.metaValue}>{m.value}</div>
            </div>
          ))}

          <ContactDetailPanel
            id={s.id}
            name={s.name}
            email={s.email}
            phone={s.phone}
            status={s.status}
          />
        </div>
      </div>
    </section>
  );
}
