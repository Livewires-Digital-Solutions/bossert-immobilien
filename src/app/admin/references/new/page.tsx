import Link from 'next/link';
import { requireAdmin } from '@/lib/require-admin';
import ReferenceEditor from '@/components/admin/ReferenceEditor';
import admin from '../../admin.module.css';

export const metadata = { title: 'New reference · Bossert Admin' };

export default async function NewReferencePage() {
  await requireAdmin();
  return (
    <section>
      <div className={admin.eyebrow}>
        <Link href="/admin/references" style={{ color: 'inherit' }}>
          References
        </Link>{' '}
        / New
      </div>
      <h1 className={admin.pageTitle}>New reference</h1>
      <ReferenceEditor />
    </section>
  );
}
