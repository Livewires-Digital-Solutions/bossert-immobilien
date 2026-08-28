import "@/components/home/home.css";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import SearchSection from "@/components/home/SearchSection";
import ExploreSection from "@/components/home/ExploreSection";
import WhySection from "@/components/home/WhySection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CtaSection from "@/components/home/CtaSection";
import { prisma } from "@/lib/prisma";
import { mockProperties, mockReferences, MockProperty, MockReference } from "@/lib/mock-data";

export default async function HomePage() {
  // TEMP: DISABLED FOR STATIC DEPLOY — see mock-data.ts
  // const dbProperties = await prisma.property.findMany({
  //   where: { published: true, featured: true },
  //   include: { images: { orderBy: { order: 'asc' }, take: 1 } },
  //   take: 4
  // });
  const dbProperties = mockProperties.filter(p => p.featured).slice(0, 4);

  // TEMP: DISABLED FOR STATIC DEPLOY — see mock-data.ts
  // const dbReferences = await prisma.reference.findMany({
  //   where: { published: true },
  //   include: { images: { orderBy: { order: 'asc' }, take: 1 } },
  //   take: 5
  // });
  const dbReferences = mockReferences.slice(0, 5);

  const exploreProperties = dbProperties.map((p: MockProperty) => ({
    id: p.id,
    slug: p.slug,
    type: p.type,
    city: p.city,
    price: p.price,
    rooms: p.rooms,
    bathrooms: p.bathrooms,
    sqm: p.sqm,
    image: p.images[0]?.url || '/placeholder.jpg'
  }));

  const testimonials = dbReferences.map((r: MockReference) => ({
    id: r.id,
    author: r.testimonialAuthor || r.titleEn,
    location: r.location,
    quote: r.testimonialQuote || r.summaryEn,
    image: r.images[0]?.url || '/placeholder.jpg'
  })).filter((t: any) => t.quote && t.author);

  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <SearchSection />
      <ExploreSection properties={exploreProperties} />
      <WhySection />
      <TestimonialSection testimonials={testimonials} />
      <CtaSection />
    </main>
  );
}
