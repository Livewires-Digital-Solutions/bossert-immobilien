import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from '@/auth.config';

// Proxy-only Auth.js instance: decodes the JWT session, no providers / Prisma / bcrypt.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) return;

  if (!req.auth?.user) {
    const url = new URL('/login', req.nextUrl);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  const role = req.auth.user.role;
  if (role !== 'ADMIN' && role !== 'SUPERADMIN') {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
});

export const config = {
  matcher: ['/admin/:path*'],
};
