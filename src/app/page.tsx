import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import IntroPromo from '@/components/IntroPromo';
import ServicesSection from '@/components/ServicesSection';
import ExploreSection from '@/components/ExploreSection';
import WhySection from '@/components/WhySection';
import TestimonialSection from '@/components/TestimonialSection';
import ActionPromptSection from '@/components/ActionPromptSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import IntroSequence from '@/components/IntroSequence';

export default function Home() {
  return (
    <main className="home-page">
      <IntroSequence />
      <HeroSection />
      {/* <StatsSection /> */}
      <IntroPromo />
      <ServicesSection />
      <ExploreSection />
      <WhySection />
      <TestimonialSection />
      <ActionPromptSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
