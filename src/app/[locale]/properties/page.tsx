import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { mockProperties, MockProperty } from "@/lib/mock-data";
import PropertiesView from "./PropertiesView";

export default async function PropertiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // TEMP: DISABLED FOR STATIC DEPLOY — see mock-data.ts
  // const dbProperties = await prisma.property.findMany({
  //   where: { published: true },
  //   include: { images: { orderBy: { order: "asc" } }, features: { orderBy: { order: "asc" } } },
  //   orderBy: { createdAt: "desc" },
  // });
  const dbProperties = mockProperties;

  const properties = dbProperties.map((p: MockProperty) => ({
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
