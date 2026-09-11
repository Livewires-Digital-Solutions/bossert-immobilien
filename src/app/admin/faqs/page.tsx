import { requireAdmin } from '@/lib/require-admin';
import { getAllFaqs } from '@/lib/faqs';
import FaqsAdminList from '@/components/admin/FaqsAdminList';

export const metadata = { title: 'FAQs · Bossert Admin' };

export default async function AdminFaqsPage() {
  await requireAdmin();
  const faqs = await getAllFaqs();
  return <FaqsAdminList faqs={faqs} />;
}
