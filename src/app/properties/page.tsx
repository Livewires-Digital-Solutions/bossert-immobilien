import React, { Suspense } from 'react';
import PropertiesHero from '@/components/PropertiesHero';
import SearchSection from '@/components/SearchSection';
import PropertiesGrid from '@/components/PropertiesGrid';
import DiscreetNetworkSection from '@/components/DiscreetNetworkSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

export default function PropertiesPage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <PropertiesHero />
      <SearchSection hideHeader={true} isDarkBg={true} hideResultsCount={true} />
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem' }}>Loading properties...</div>}>
        <PropertiesGrid />
      </Suspense>
      <DiscreetNetworkSection />
      <CtaSection variant="properties" />
      <Footer />
    </main>
  );
}
