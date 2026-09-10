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

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    // dev convenience: keep .env the source of truth. For production, drop
    // `name` / `passwordHash` from `update` so a redeploy can't reset the password.
    update: { role: 'SUPERADMIN', name, passwordHash },
    create: {
      email: email.toLowerCase(),
      name,
      passwordHash,
      role: 'SUPERADMIN',
      emailVerified: new Date(),
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
