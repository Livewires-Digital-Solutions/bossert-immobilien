import 'server-only';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

/**
 * Server-side data-access guard for the /admin area.
 * Call in every admin layout AND page (Next 16 layouts don't gate child segments).
 */
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login?callbackUrl=/admin');
  }
  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPERADMIN') {
    redirect('/');
  }

  return session;
}
