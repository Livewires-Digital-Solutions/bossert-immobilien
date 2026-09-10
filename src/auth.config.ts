import type { NextAuthConfig } from 'next-auth';

/**
 * Proxy-safe Auth.js config: no providers, no Prisma, no bcrypt.
 * Imported by both `src/auth.ts` (full config) and `src/proxy.ts` (edge-lean JWT check).
 */
export const authConfig = {
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  trustHost: true,
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: 'USER' | 'ADMIN' | 'SUPERADMIN' }).role ?? 'USER';
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'USER' | 'ADMIN' | 'SUPERADMIN';
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
