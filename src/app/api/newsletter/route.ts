import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { prisma } from '@/lib/prisma';
import { assertSameOrigin } from '@/lib/http';

const schema = z.object({
  email: z.string().trim().email('Please enter a valid email').max(200),
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

    const email = parsed.data.email.toLowerCase();
    const existing = await prisma.newsletter_subscribers.findUnique({ where: { email } });

    if (existing) {
      // Already subscribed — reactivate silently if they'd unsubscribed, but
      // always report success so we don't leak subscription status.
      if (!existing.isActive) {
        await prisma.newsletter_subscribers.update({
          where: { email },
          data: { isActive: true },
        });
      }
      return NextResponse.json({ ok: true });
    }

    await prisma.newsletter_subscribers.create({
      data: { id: createId(), email, isActive: true },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('NEWSLETTER SUBSCRIBE ERROR:', error);
    return NextResponse.json({ error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}
