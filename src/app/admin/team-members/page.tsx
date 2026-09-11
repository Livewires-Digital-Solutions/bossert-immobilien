import { requireAdmin } from '@/lib/require-admin';
import { getAllTeamMembers } from '@/lib/team-members';
import TeamMembersAdminList from '@/components/admin/TeamMembersAdminList';

export const metadata = { title: 'Team · Bossert Admin' };

export default async function AdminTeamMembersPage() {
  await requireAdmin();
  const members = await getAllTeamMembers();
  return <TeamMembersAdminList members={members} />;
}
