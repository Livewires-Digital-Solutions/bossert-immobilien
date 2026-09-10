import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from '@/auth.config';

// Proxy-only Auth.js instance: decodes the JWT session, no providers / Prisma / bcrypt.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAdminArea = pathname.startsWith('/admin');
  const isProfileArea = pathname.startsWith('/profile');
  if (!isAdminArea && !isProfileArea) return;

  // Not signed in → send to login with a return path.
  if (!req.auth?.user) {
    const url = new URL('/login', req.nextUrl);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Optimistic admin gate (the /admin data-access layer re-checks authoritatively).
  // Also honour the role directly so sessions issued before `isAdmin` existed still work.
  const u = req.auth.user;
  const mayAdmin = u.isAdmin || u.role === 'ADMIN' || u.role === 'SUPERADMIN';
  if (isAdminArea && !mayAdmin) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
});

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*'],
};
