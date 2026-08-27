import HeroSection from '@/components/HeroSection';
import SearchSection from '@/components/SearchSection';
import ServicesSection from '@/components/ServicesSection';
import ExploreSection from '@/components/ExploreSection';
import WhySection from '@/components/WhySection';
import TestimonialSection from '@/components/TestimonialSection';
import CtaSection from '@/components/CtaSection';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const properties = await prisma.property.findMany({
    where: { published: true, featured: true },
    take: 4,
    include: { images: true }
  });

  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <SearchSection />
      <ExploreSection properties={properties} />
      <WhySection />
      <TestimonialSection />
      <CtaSection />
    </main>
  );
}
