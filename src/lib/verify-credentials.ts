import 'server-only';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

/**
 * Verifies an email/password pair against the DB.
 * Returns a minimal user object on success, or null (used by the Credentials provider).
 */
export async function verifyCredentials(email: string, password: string) {
  const user = await (prisma as any).users.findUnique({ where: { email: email.toLowerCase() } });
  if (!user?.password) return null;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  return { id: user.id, email: user.email, name: user.name, role: user.role };
}
