import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import ServicesExcerpt from "@/components/home/ServicesExcerpt";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <FeaturedProperties />
      <ServicesExcerpt />
      <CallToAction />
    </main>
  );
}
