import "@/components/home/home.css";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import SearchSection from "@/components/home/SearchSection";
import ExploreSection from "@/components/home/ExploreSection";
import WhySection from "@/components/home/WhySection";
import TestimonialSection from "@/components/home/TestimonialSection";
import CtaSection from "@/components/home/CtaSection";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const dbProperties = await prisma.property.findMany({
    where: { published: true, featured: true },
    include: { images: { orderBy: { order: 'asc' }, take: 1 } },
    take: 4
  });

  const dbReferences = await prisma.reference.findMany({
    where: { published: true },
    include: { images: { orderBy: { order: 'asc' }, take: 1 } },
    take: 5
  });

  const exploreProperties = dbProperties.map(p => ({
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

  const testimonials = dbReferences.map(r => ({
    id: r.id,
    author: r.testimonialAuthor || r.titleEn,
    location: r.location,
    quote: r.testimonialQuote || r.summaryEn,
    image: r.images[0]?.url || '/placeholder.jpg'
  })).filter(t => t.quote && t.author);

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
