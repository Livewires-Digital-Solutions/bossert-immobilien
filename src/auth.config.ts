import type { NextAuthConfig } from 'next-auth';
import { isAdminAccount } from '@/lib/admin-emails';

type AppRole = 'USER' | 'ADMIN' | 'SUPERADMIN';

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
        const role = (user as { role?: AppRole }).role ?? 'USER';
        token.id = user.id as string;
        token.role = role;
        token.isAdmin = isAdminAccount(user.email, role);
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as AppRole;
        session.user.isAdmin = Boolean(token.isAdmin);
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
