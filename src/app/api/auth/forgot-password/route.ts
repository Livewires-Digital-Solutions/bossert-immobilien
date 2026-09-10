import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createResetToken } from '@/lib/reset-tokens';
import { sendMail } from '@/lib/mailer';
import { assertSameOrigin } from '@/lib/http';

const schema = z.object({ email: z.string().trim().email() });

export async function POST(req: Request) {
  // Always respond { ok: true } — never reveal whether an account exists.
  if (!assertSameOrigin(req)) return NextResponse.json({ ok: true });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (parsed.success) {
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
    });

    if (user) {
      const raw = await createResetToken(user.id);
      const url = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${raw}`;
      await sendMail({
        to: user.email,
        subject: 'Reset your Bossert Immobilien password',
        text: `Reset your password using this link (expires in 1 hour):\n\n${url}\n\nIf you didn't request this, you can ignore this email.`,
        html: `<p>Reset your password using this link (expires in 1 hour):</p><p><a href="${url}">${url}</a></p><p>If you didn't request this, you can ignore this email.</p>`,
      });
    }
  }

  return NextResponse.json({ ok: true });
}
