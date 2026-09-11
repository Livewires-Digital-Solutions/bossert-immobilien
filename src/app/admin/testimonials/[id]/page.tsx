import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/require-admin';
import { getTestimonialById } from '@/lib/testimonials';
import TestimonialEditor from '@/components/admin/TestimonialEditor';
import type { TestimonialFormValues } from '../actions';
import admin from '../../admin.module.css';

export const metadata = { title: 'Edit testimonial · Bossert Admin' };

export default async function EditTestimonialPage(props: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await props.params;
  const item = await getTestimonialById(id);
  if (!item) notFound();

  const initial: TestimonialFormValues & { id: string } = {
    id: item.id,
    quoteEn: item.quoteEn,
    quoteDe: item.quoteDe ?? '',
    author: item.author,
    location: item.location,
    image: item.image ?? '',
    order: item.order,
    isActive: item.isActive,
  };

  return (
    <section>
      <div className={admin.eyebrow}>
        <Link href="/admin/testimonials" style={{ color: 'inherit' }}>
          Testimonials
        </Link>{' '}
        / Edit
      </div>
      <h1 className={admin.pageTitle}>{item.author}</h1>
      <TestimonialEditor initial={initial} />
    </section>
  );
}
