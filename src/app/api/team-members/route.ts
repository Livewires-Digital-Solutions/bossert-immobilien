/**
 * GET /api/team-members — active team members, both languages.
 */
import { NextResponse } from 'next/server';
import { withBackendGuard } from '@/lib/backend-config';
import { getActiveTeamMembers } from '@/lib/team-members';

export const dynamic = 'force-dynamic';

export const GET = withBackendGuard(async function GET() {
  const rows = await getActiveTeamMembers();
  const members = rows.map((m) => ({
    id: m.id,
    name: m.name,
    image: m.image ?? '',
    en: { title: m.titleEn, quote: m.quoteEn ?? '' },
    de: { title: m.titleDe || m.titleEn, quote: (m.quoteDe || m.quoteEn) ?? '' },
  }));
  return NextResponse.json({ members });
});
