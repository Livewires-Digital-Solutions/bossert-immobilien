import Link from 'next/link';
import { requireAdmin } from '@/lib/require-admin';
import TeamMemberEditor from '@/components/admin/TeamMemberEditor';
import admin from '../../admin.module.css';

export const metadata = { title: 'New team member · Bossert Admin' };

export default async function NewTeamMemberPage() {
  await requireAdmin();
  return (
    <section>
      <div className={admin.eyebrow}>
        <Link href="/admin/team-members" style={{ color: 'inherit' }}>
          Team
        </Link>{' '}
        / New
      </div>
      <h1 className={admin.pageTitle}>New team member</h1>
      <TeamMemberEditor />
    </section>
  );
}
