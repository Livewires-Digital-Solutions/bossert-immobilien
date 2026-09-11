import 'server-only';
import crypto from 'crypto';
import { createId } from '@paralleldrive/cuid2';
import { prisma } from '@/lib/prisma';

const TTL_MS = 1000 * 60 * 60; // 1 hour

/** SHA-256 hex digest — only the hash of a reset token is ever stored. */
export const hashToken = (raw: string) =>
  crypto.createHash('sha256').update(raw).digest('hex');

/**
 * Issues a single-use password-reset token for a user.
 * Any earlier unused tokens for that user are invalidated first.
 * Returns the RAW token (to be emailed); only its hash is persisted.
 */
export async function createResetToken(userId: string): Promise<string> {
  const raw = crypto.randomBytes(32).toString('hex');

  await prisma.password_reset_tokens.deleteMany({ where: { userId, usedAt: null } });
  await prisma.password_reset_tokens.create({
    data: {
      id: createId(),
      userId,
      tokenHash: hashToken(raw),
      expires: new Date(Date.now() + TTL_MS),
    },
  });

  return raw;
}
