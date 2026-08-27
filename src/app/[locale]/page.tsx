import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WhatWeDo";
import Stats from "@/components/home/Stats";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import PropertySearch from "@/components/home/PropertySearch";
import ServicesExcerpt from "@/components/home/ServicesExcerpt";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <Stats />
      <PropertySearch />
      <FeaturedProperties />
      <ServicesExcerpt />
      <CallToAction />
    </main>
  );
}
