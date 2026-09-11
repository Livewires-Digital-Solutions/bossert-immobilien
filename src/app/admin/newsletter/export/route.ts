import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/require-admin';
import { getAllSubscribers } from '@/lib/newsletter';

function csvEscape(v: string) {
  return `"${v.replace(/"/g, '""')}"`;
}

export async function GET() {
  await requireAdmin();
  const subscribers = await getAllSubscribers();

  const rows = [
    ['email', 'status', 'subscribedAt'].join(','),
    ...subscribers.map((s) =>
      [csvEscape(s.email), s.isActive ? 'active' : 'inactive', s.subscribedAt.toISOString()].join(','),
    ),
  ];

  return new NextResponse(rows.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="newsletter-subscribers.csv"',
    },
  });
}
