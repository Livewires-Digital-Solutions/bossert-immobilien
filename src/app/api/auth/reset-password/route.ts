import { NextResponse } from 'next/server';
import { withBackendGuard } from '@/lib/backend-config';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hashToken } from '@/lib/reset-tokens';
import { assertSameOrigin } from '@/lib/http';

const schema = z.object({
  token: z.string().min(10),
  password: z.string().min(8).max(200),
});

export const POST = withBackendGuard(async function POST(req: Request) {
  if (!assertSameOrigin(req)) {
    return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'INVALID_INPUT' }, { status: 400 });
  }

  const row = await prisma.password_reset_tokens.findUnique({
    where: { tokenHash: hashToken(parsed.data.token) },
  });

  if (!row || row.usedAt || row.expires < new Date()) {
    return NextResponse.json({ error: 'INVALID_TOKEN' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await prisma.$transaction([
    (prisma as any).users.update({ where: { id: row.userId }, data: { password: passwordHash } }),
    prisma.password_reset_tokens.update({ where: { id: row.id }, data: { usedAt: new Date() } }),
  ]);

  return NextResponse.json({ ok: true });
});
