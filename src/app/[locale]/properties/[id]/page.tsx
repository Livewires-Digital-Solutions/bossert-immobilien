import { setRequestLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import PropertyDetailView from "./PropertyDetailView";
import { notFound } from "next/navigation";

export default async function PropertyDetailPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const p = await prisma.property.findUnique({
    where: { slug: id },
    include: { images: { orderBy: { order: "asc" } }, features: { orderBy: { order: "asc" } } },
  });

  if (!p) {
    notFound();
  }

  const property = {
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
  };

  return <PropertyDetailView property={property} />;
}
