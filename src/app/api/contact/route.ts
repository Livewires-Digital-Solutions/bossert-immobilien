import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { prisma } from '@/lib/prisma';
import { assertSameOrigin } from '@/lib/http';
import { sendMail } from '@/lib/mailer';
import { parseAdminEmails } from '@/lib/admin-emails';

const db = prisma as any;

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  email: z.string().trim().email('Please enter a valid email').max(200),
  phone: z.string().trim().max(60).optional().or(z.literal('')),
  inquiryType: z.string().trim().max(120).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Please add a few more details').max(4000),
  heardAbout: z.string().trim().max(120).optional().or(z.literal('')),
  source: z.string().trim().max(60).optional(),
  consent: z.literal(true, { message: 'Please accept the privacy policy' }).optional(),
  // Honeypot — parsed loosely, checked in code so bots get a fake success.
  company: z.string().max(200).optional(),
});

export async function POST(req: Request) {
  try {
    if (!assertSameOrigin(req)) {
      return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
    }

    const parsed = schema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'INVALID_INPUT', message: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 },
      );
    }

    const d = parsed.data;
    if (d.company) {
      // Honeypot tripped — pretend success, store nothing.
      return NextResponse.json({ ok: true });
    }

    const now = new Date();
    const submission = await db.contact_submissions.create({
      data: {
        id: createId(),
        name: d.name,
        email: d.email || null,
        phone: d.phone || null,
        inquiryType: d.inquiryType || null,
        message: d.message,
        heardAbout: d.heardAbout || null,
        source: d.source?.trim() || 'contact_page',
        status: 'NEW',
        updatedAt: now,
      },
    });

    // Best-effort admin notification — never blocks the response.
    notifyAdmins(submission).catch((e) => console.error('[contact] notify failed:', e));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('CONTACT SUBMISSION ERROR:', error);
    return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

async function notifyAdmins(s: {
  name: string;
  email: string | null;
  phone: string | null;
  inquiryType: string | null;
  message: string;
  source: string;
}) {
  const to = parseAdminEmails()[0];
  if (!to) return;

  const site = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  const lines = [
    `Name:    ${s.name}`,
    `Email:   ${s.email ?? '—'}`,
    `Phone:   ${s.phone ?? '—'}`,
    `Type:    ${s.inquiryType ?? '—'}`,
    `Source:  ${s.source}`,
    '',
    s.message,
    '',
    site ? `Manage: ${site}/admin/contact` : '',
  ];

  await sendMail({
    to,
    subject: `New enquiry — ${s.name}`,
    text: lines.join('\n'),
    html: `<pre style="font:14px/1.6 ui-monospace,Menlo,monospace">${lines
      .join('\n')
      .replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c] as string))}</pre>`,
  });
}
