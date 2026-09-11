import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import { getPublicPropertyCards } from '@/lib/property-view';
import { fetchOnOfficeProperties } from '@/lib/onoffice';
import { mockProperties } from '@/data/properties';
import PropertyBillboard from '@/components/properties/PropertyBillboard';
import PropertyCollection from '@/components/properties/PropertyCollection';
import PropertyOffMarketCta from '@/components/properties/PropertyOffMarketCta';
import styles from '@/components/properties/collection.module.css';

export const metadata: Metadata = {
  title: 'Properties · Bossert Immobilien',
  description:
    'The Bossert Immobilien collection — curated residential and commercial property across the Rhein-Main region.',
};

export const revalidate = 120;

// Curated, purpose-shot hero image — used instead of a live listing photo so
// the hero always looks intentional, even when the first live property isn't
// a great hero candidate (e.g. a commercial building interior).
const HERO_IMAGE = '/images/luxury_estate_hero.jpg';

async function loadProperties() {
  try {
    const curated = await getPublicPropertyCards();
    if (curated && curated.length > 0) return curated;
  } catch (err) {
    console.error('[properties] curated lookup failed:', err);
  }
  try {
    const live = await fetchOnOfficeProperties();
    if (live && live.length > 0) return live;
  } catch (err) {
    console.error('[properties] onOffice lookup failed:', err);
  }
  return mockProperties;
}

export default async function PropertiesPage() {
  const properties = await loadProperties();

  return (
    <main className={styles.page}>
      <PropertyBillboard image={HERO_IMAGE} count={properties.length} />
      <PropertyCollection properties={properties} />
      <PropertyOffMarketCta />
      <Footer />
    </main>
  );
}
