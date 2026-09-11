import Link from 'next/link';
import { requireAdmin } from '@/lib/require-admin';
import TestimonialEditor from '@/components/admin/TestimonialEditor';
import admin from '../../admin.module.css';

export const metadata = { title: 'New testimonial · Bossert Admin' };

export default async function NewTestimonialPage() {
  await requireAdmin();
  return (
    <section>
      <div className={admin.eyebrow}>
        <Link href="/admin/testimonials" style={{ color: 'inherit' }}>
          Testimonials
        </Link>{' '}
        / New
      </div>
      <h1 className={admin.pageTitle}>New testimonial</h1>
      <TestimonialEditor />
    </section>
  );
}
