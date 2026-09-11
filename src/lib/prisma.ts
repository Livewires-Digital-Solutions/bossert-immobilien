import { PrismaClient } from '@prisma/client';
import { isBackendEnabled } from '@/lib/backend-config';

export class BackendDisabledError extends Error {
  constructor() {
    super('Backend is disabled: PrismaClient is not available.');
    this.name = 'BackendDisabledError';
  }
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// If backend is disabled, create a Proxy that throws on any method call (e.g. prisma.users.findUnique)
// This guarantees zero connection attempts and immediate fail-safe.
const createPrismaProxy = () => {
  return new Proxy({} as PrismaClient, {
    get: (target, prop) => {
      // Allow NextAuth or other systems to check if properties exist without crashing immediately
      if (prop === '$connect' || prop === '$disconnect') {
        return async () => {}; // No-op
      }
      if (prop === 'then') {
        return undefined; // Promise chaining safety
      }
      throw new BackendDisabledError();
    }
  });
};

export const prisma =
  globalForPrisma.prisma ??
  (isBackendEnabled()
    ? new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      })
    : createPrismaProxy());

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
