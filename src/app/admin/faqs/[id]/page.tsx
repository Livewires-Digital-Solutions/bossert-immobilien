import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/require-admin';
import { getFaqById } from '@/lib/faqs';
import FaqEditor from '@/components/admin/FaqEditor';
import type { FaqFormValues } from '../actions';
import admin from '../../admin.module.css';

export const metadata = { title: 'Edit FAQ · Bossert Admin' };

export default async function EditFaqPage(props: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await props.params;
  const f = await getFaqById(id);
  if (!f) notFound();

  const initial: FaqFormValues & { id: string } = {
    id: f.id,
    questionEn: f.questionEn,
    questionDe: f.questionDe ?? '',
    answerEn: f.answerEn,
    answerDe: f.answerDe ?? '',
    order: f.order,
    isActive: f.isActive,
  };

  return (
    <section>
      <div className={admin.eyebrow}>
        <Link href="/admin/faqs" style={{ color: 'inherit' }}>
          FAQs
        </Link>{' '}
        / Edit
      </div>
      <h1 className={admin.pageTitle}>{f.questionEn}</h1>
      <FaqEditor initial={initial} />
    </section>
  );
}
