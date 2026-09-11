import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/require-admin';
import { getTeamMemberById } from '@/lib/team-members';
import TeamMemberEditor from '@/components/admin/TeamMemberEditor';
import type { TeamMemberFormValues } from '../actions';
import admin from '../../admin.module.css';

export const metadata = { title: 'Edit team member · Bossert Admin' };

export default async function EditTeamMemberPage(props: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await props.params;
  const m = await getTeamMemberById(id);
  if (!m) notFound();

  const initial: TeamMemberFormValues & { id: string } = {
    id: m.id,
    name: m.name,
    titleEn: m.titleEn,
    titleDe: m.titleDe ?? '',
    quoteEn: m.quoteEn ?? '',
    quoteDe: m.quoteDe ?? '',
    image: m.image ?? '',
    order: m.order,
    isActive: m.isActive,
  };

  return (
    <section>
      <div className={admin.eyebrow}>
        <Link href="/admin/team-members" style={{ color: 'inherit' }}>
          Team
        </Link>{' '}
        / Edit
      </div>
      <h1 className={admin.pageTitle}>{m.name}</h1>
      <TeamMemberEditor initial={initial} />
    </section>
  );
}
