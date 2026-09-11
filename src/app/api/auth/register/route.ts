import { NextResponse } from 'next/server';
import { withBackendGuard } from '@/lib/backend-config';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { assertSameOrigin } from '@/lib/http';
import { createId } from '@paralleldrive/cuid2';

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  password: z.string().min(8).max(200),
});

export const POST = withBackendGuard(async function POST(req: Request) {
  try {
    if (!assertSameOrigin(req)) {
      return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
    }

    const parsed = schema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json({ error: 'INVALID_INPUT' }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    const existing = await (prisma as any).users.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json({ error: 'EMAIL_TAKEN' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const now = new Date();
    await (prisma as any).users.create({
      data: { 
        id: createId(),
        name, 
        email: normalizedEmail, 
        password: passwordHash,
        role: 'VIEWER',
        updatedAt: now
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
});

