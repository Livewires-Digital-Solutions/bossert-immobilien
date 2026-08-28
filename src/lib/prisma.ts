// Disconnected backend for now
export const prisma = new Proxy({}, {
  get: () => {
    return new Proxy({}, {
      get: () => {
        return () => Promise.resolve([]);
      }
    });
  }
}) as any;
