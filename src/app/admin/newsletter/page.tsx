import { requireAdmin } from '@/lib/require-admin';
import { getAllSubscribers } from '@/lib/newsletter';
import NewsletterAdminList from '@/components/admin/NewsletterAdminList';

export const metadata = { title: 'Newsletter · Bossert Admin' };

export default async function AdminNewsletterPage() {
  await requireAdmin();
  const subscribers = await getAllSubscribers();
  return <NewsletterAdminList subscribers={subscribers} />;
}
