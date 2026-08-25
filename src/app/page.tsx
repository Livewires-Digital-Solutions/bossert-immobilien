import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import ServicesExcerpt from "@/components/home/ServicesExcerpt";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProperties />
        <ServicesExcerpt />
        <CallToAction />
      </main>
    </>
  );
}
