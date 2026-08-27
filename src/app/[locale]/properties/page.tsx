import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import PropertiesView from "./PropertiesView";

export default async function PropertiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch properties from database
  const dbProperties = await prisma.property.findMany({
    where: { published: true },
    include: { images: { orderBy: { order: "asc" } }, features: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  const properties = dbProperties.map(p => ({
    id: p.id,
    slug: p.slug,
    title: locale === 'de' ? p.titleDe : p.titleEn,
    type: p.type,
    location: p.location,
    city: p.city,
    sqm: p.sqm,
    plotSqm: p.plotSqm,
    rooms: p.rooms,
    bathrooms: p.bathrooms,
    yearBuilt: p.yearBuilt,
    energyClass: p.energyClass,
    price: p.price,
    status: p.status,
    description: locale === 'de' ? p.descriptionDe : p.descriptionEn,
    agent: p.agent,
    image: p.images[0]?.url || "",
    images: p.images.map(img => img.url),
    features: p.features.map(f => locale === 'de' ? f.textDe : f.textEn),
  }));

  return <PropertiesView properties={properties} />;
}
