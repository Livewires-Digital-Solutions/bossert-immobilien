import { requireAdmin } from '@/lib/require-admin';
import { getAllReferences } from '@/lib/references';
import ReferencesAdminList from '@/components/admin/ReferencesAdminList';

export const metadata = { title: 'References · Bossert Admin' };

export default async function AdminReferencesPage() {
  await requireAdmin();
  const references = await getAllReferences();
  return <ReferencesAdminList references={references} />;
}
