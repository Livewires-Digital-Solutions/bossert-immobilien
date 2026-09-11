import { config } from 'dotenv';
config({ path: '.env.local' });

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SUPERADMIN_EMAIL;
  const password = process.env.SUPERADMIN_PASSWORD;
  const name = process.env.SUPERADMIN_NAME ?? 'Super Admin';

  if (!email || !password) {
    throw new Error('SUPERADMIN_EMAIL / SUPERADMIN_PASSWORD must be set in .env.local');
  }

  const passwordHashed = await bcrypt.hash(password, 12);
  const { createId } = await import('@paralleldrive/cuid2');

  const user = await (prisma as any).users.upsert({
    where: { email: email.toLowerCase() },
    update: { role: 'SUPER_ADMIN', name, password: passwordHashed, updatedAt: new Date() },
    create: {
      id: createId(),
      email: email.toLowerCase(),
      name,
      password: passwordHashed,
      role: 'SUPER_ADMIN',
      updatedAt: new Date(),
    },
  });

  console.log(`✅ Superadmin ready: ${user.email}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
