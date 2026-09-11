import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authConfig } from '@/auth.config';
import { verifyCredentials } from '@/lib/verify-credentials';
import { isBackendEnabled } from '@/lib/backend-config';

const credsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  ...(isBackendEnabled() ? { adapter: PrismaAdapter(prisma) } : {}),
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (raw) => {
        if (!isBackendEnabled()) {
          throw new Error('Backend is disabled. Authentication is currently unavailable.');
        }
        const parsed = credsSchema.safeParse(raw);
        if (!parsed.success) return null;
        return verifyCredentials(parsed.data.email, parsed.data.password);
      },
    }),
  ],
});
