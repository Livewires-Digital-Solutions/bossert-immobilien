import 'server-only';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { isAdminAccount } from '@/lib/admin-emails';

/**
 * Authoritative server-side guard for the /admin area. Re-checks the live
 * `ADMIN_EMAILS` allowlist (and role) rather than trusting the JWT flag, so
 * revoking access takes effect on the next request.
 * Call in every admin layout AND page (Next 16 layouts don't gate child segments).
 */
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/admin');
  }
  if (!isAdminAccount(session.user.email, session.user.role)) {
    redirect('/');
  }

  return session;
}
