import Link from 'next/link';
import { requireAdmin } from '@/lib/require-admin';
import FaqEditor from '@/components/admin/FaqEditor';
import admin from '../../admin.module.css';

export const metadata = { title: 'New FAQ · Bossert Admin' };

export default async function NewFaqPage() {
  await requireAdmin();
  return (
    <section>
      <div className={admin.eyebrow}>
        <Link href="/admin/faqs" style={{ color: 'inherit' }}>
          FAQs
        </Link>{' '}
        / New
      </div>
      <h1 className={admin.pageTitle}>New FAQ</h1>
      <FaqEditor />
    </section>
  );
}
