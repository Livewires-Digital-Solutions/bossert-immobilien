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

  const testimonials = [
    {
      id: 'seed-testimonial-schneider',
      quoteEn: "On downsizing after our children moved out; Bossert Immobilien supported us not just in selling our previous property but also in finding a new, suitable home. The guidance felt professional, personal, and reliable throughout.",
      quoteDe: "Beim Verkleinern, nachdem unsere Kinder ausgezogen waren, hat uns Bossert Immobilien nicht nur beim Verkauf unserer bisherigen Immobilie unterstützt, sondern auch bei der Suche nach einem neuen, passenden Zuhause. Die Beratung war durchweg professionell, persönlich und verlässlich.",
      author: 'Schneider',
      location: 'Home Sale & Purchase',
      image: '/test_bg_villa.jpg',
      order: 0,
    },
    {
      id: 'seed-testimonial-fr-h',
      quoteEn: 'Excellent property exposé, prompt responsiveness, and accurate property description. The experience was fully satisfactory.',
      quoteDe: 'Ein hervorragendes Exposé, schnelle Reaktionszeiten und eine präzise Objektbeschreibung. Die Erfahrung war rundum zufriedenstellend.',
      author: 'Fr. H',
      location: 'Property Purchase',
      image: '/test_bg_penthouse.jpg',
      order: 1,
    },
    {
      id: 'seed-testimonial-w-mayer',
      quoteEn: 'We have worked with Bossert Immobilien multiple times over the years for property marketing. Each experience has been a genuine relief and consistently positive.',
      quoteDe: 'Wir haben über die Jahre mehrfach mit Bossert Immobilien für die Vermarktung von Immobilien zusammengearbeitet. Jede Erfahrung war eine echte Erleichterung und durchweg positiv.',
      author: 'W. Mayer',
      location: 'Multiple Transactions',
      image: '/test_bg_estate.jpg',
      order: 2,
    },
  ];

  for (const t of testimonials) {
    await (prisma as any).testimonials.upsert({
      where: { id: t.id },
      update: { ...t, updatedAt: new Date() },
      create: { ...t, updatedAt: new Date() },
    });
  }

  console.log(`✅ Seeded ${testimonials.length} sample testimonials`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
