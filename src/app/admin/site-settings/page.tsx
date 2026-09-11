import { requireAdmin } from '@/lib/require-admin';
import { getSiteSettingsForAdmin } from '@/lib/site-settings';
import SiteSettingsForm from '@/components/admin/SiteSettingsForm';

export const metadata = { title: 'Site Settings · Bossert Admin' };

export default async function AdminSiteSettingsPage() {
  await requireAdmin();
  const initial = await getSiteSettingsForAdmin();
  return <SiteSettingsForm initial={initial} />;
}
