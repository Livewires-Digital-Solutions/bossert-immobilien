import 'server-only';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

/** Guard for signed-in-only areas (e.g. /profile). */
export async function requireUser(callbackUrl = '/profile') {
  const session = await auth();

  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return session;
}
