const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

// Workaround to import TS config data in a JS context, or we can just run this via ts-node
import {
  PROPERTIES,
  BLOG_ARTICLES,
  KNOWLEDGE_CATEGORIES,
  ARTICLES,
  REFERENCES,
  TEAM_MEMBERS,
} from "../src/config";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // 1. Admin
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: "admin@bossert-immobilien.de" },
  });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("bossert2026", 10);
    await prisma.admin.create({
      data: {
        email: "admin@bossert-immobilien.de",
        password: hashedPassword,
      },
    });
    console.log("Created admin user.");
  }

  // 2. Properties
  for (const p of PROPERTIES) {
    const existing = await prisma.property.findUnique({ where: { slug: p.slug } });
    if (!existing) {
      await prisma.property.create({
        data: {
          slug: p.slug,
          titleEn: p.title,
          titleDe: p.title, // seeded same as EN initially
          type: p.type as any,
          location: p.location,
          city: p.city,
          sqm: p.sqm,
          plotSqm: p.plotSqm,
          rooms: p.rooms,
          bathrooms: p.bathrooms,
          yearBuilt: p.yearBuilt,
          energyClass: p.energyClass,
          price: p.price,
          status: p.status.replace(" ", "") as any,
          descriptionEn: p.description,
          descriptionDe: p.description,
          agent: p.agent,
          featured: p.id <= 3, // Just a guess for featured
          images: {
            create: [
              { url: p.image, order: 0 },
              ...(p.images || []).map((img, i) => ({ url: img, order: i + 1 })),
            ],
          },
          features: {
            create: p.features.map((f, i) => ({ textEn: f, textDe: f, order: i })),
          },
        },
      });
      console.log(`Created property: ${p.slug}`);
    }
  }

  // 3. Blog
  for (const b of BLOG_ARTICLES) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: b.slug } });
    if (!existing) {
      await prisma.blogPost.create({
        data: {
          slug: b.slug,
          category: b.category,
          titleEn: b.title,
          titleDe: b.title,
          excerptEn: b.excerpt,
          excerptDe: b.excerpt,
          contentEn: b.content,
          contentDe: b.content,
          image: b.image,
          date: b.date,
          readTime: b.readTime,
          author: b.author,
          featured: b.featured,
        },
      });
      console.log(`Created blog post: ${b.slug}`);
    }
  }

  // 4. Knowledge
  for (const k of ARTICLES) {
    const existing = await prisma.knowledgeArticle.findUnique({ where: { slug: k.slug } });
    if (!existing) {
      await prisma.knowledgeArticle.create({
        data: {
          slug: k.slug,
          category: k.category,
          titleEn: k.title,
          titleDe: k.title,
          excerptEn: k.excerpt,
          excerptDe: k.excerpt,
          contentEn: k.content,
          contentDe: k.content,
          image: k.image,
          date: k.date,
          readTime: k.readTime,
          author: k.author,
        },
      });
      console.log(`Created knowledge article: ${k.slug}`);
    }
  }

  // 5. References
  for (const r of REFERENCES) {
    const existing = await prisma.reference.findUnique({ where: { slug: r.slug } });
    if (!existing) {
      await prisma.reference.create({
        data: {
          slug: r.slug,
          titleEn: r.title,
          titleDe: r.title,
          category: r.category,
          location: r.location,
          year: r.year,
          summaryEn: r.summary,
          summaryDe: r.summary,
          descriptionEn: r.description,
          descriptionDe: r.description,
          result: r.result,
          testimonialQuote: r.testimonial.quote,
          testimonialAuthor: r.testimonial.author,
          images: {
            create: [
              { url: r.image, order: 0 },
              ...(r.images || []).map((img, i) => ({ url: img, order: i + 1 })),
            ],
          },
        },
      });
      console.log(`Created reference: ${r.slug}`);
    }
  }

  // 6. Team
  for (const t of TEAM_MEMBERS) {
    const existing = await prisma.teamMember.findUnique({ where: { slug: t.slug } });
    if (!existing) {
      await prisma.teamMember.create({
        data: {
          slug: t.slug,
          name: t.name,
          role: t.role,
          image: t.image,
          bioEn: t.bio,
          bioDe: t.bio,
          email: t.email,
          phone: t.phone,
          languages: t.languages,
          specialties: t.specialties,
        },
      });
      console.log(`Created team member: ${t.slug}`);
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
