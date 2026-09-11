import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockProperties, type Property } from '@/data/properties';
import { getPublicPropertyView, getRelatedProperties, type PublicPropertyView } from '@/lib/property-view';
import { fetchOnOfficePropertyById } from '@/lib/onoffice';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyHeader from '@/components/property/PropertyHeader';
import PropertyMediaTabs from '@/components/property/PropertyMediaTabs';
import PropertyLocation from '@/components/property/PropertyLocation';
import MortgageCalculator from '@/components/property/MortgageCalculator';
import PropertyPOIs from '@/components/property/PropertyPOIs';
import CuratedPropertyFacts from '@/components/property/CuratedPropertyFacts';
import RevealSection from '@/components/property/RevealSection';
import RevealCard from '@/components/RevealCard';
import PropertyCard from '@/components/PropertyCard';
import PropertyShowcase from '@/components/properties/PropertyShowcase';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

async function loadProperty(
  id: string,
): Promise<{ property: Property; sections: PublicPropertyView['sections'] } | null> {
  try {
    const curated = await getPublicPropertyView(id);
    if (curated) return curated;
  } catch (err) {
    console.error(`[property/${id}] curated lookup failed:`, err);
  }

  // Fallbacks so the page keeps working during setup / if unpublished.
  let property: Property | null = null;
  try {
    property = await fetchOnOfficePropertyById(id);
  } catch {
    /* ignore */
  }
  if (!property) property = mockProperties.find((p) => p.id === id) ?? null;
  return property ? { property, sections: [] } : null;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const data = await loadProperty(id);
  if (!data) notFound();

  const { property, sections } = data;
  const curated = sections.length > 0;

  const related = await getRelatedProperties(id, 3).catch(() => []);

  // Published onOffice properties get the full cinematic showcase. The plain
  // fallback tree below only renders for live/mock data (unpublished or
  // onOffice temporarily unreachable), so the page never breaks.
  if (curated) {
    return <PropertyShowcase property={property} sections={sections} related={related} />;
  }

  const inquiryHref = `/property-inquiry?property=${encodeURIComponent(id)}&title=${encodeURIComponent(
    property.title || property.type,
  )}`;

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', paddingTop: '160px' }}>
      <Navbar invertOnLoad={true} />

      <div className="inner-page-container">
        <PropertyGallery images={property.galleryImages} fallbackImage={property.imageSrc} />

        <div className="property-content-wrapper">
          <PropertyHeader property={property} />

          <div className="property-details-grid">
            <div className="property-main-col">
              {curated ? (
                <CuratedPropertyFacts sections={sections} />
              ) : (
                <>
                  <RevealSection className="property-section">
                    <h2 className="property-section-title">Eckdaten</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem', color: 'var(--navy)' }}>
                      {property.livingArea && <div><strong>Wohnfläche:</strong><br/>{property.livingArea}</div>}
                      {property.plotArea && <div><strong>Grundstücksfläche:</strong><br/>{property.plotArea}</div>}
                      {property.rooms && <div><strong>Zimmer:</strong><br/>{property.rooms}</div>}
                      {property.bedrooms && <div><strong>Schlafzimmer:</strong><br/>{property.bedrooms}</div>}
                      {property.bathrooms && <div><strong>Badezimmer:</strong><br/>{property.bathrooms}</div>}
                      {property.buildYear && <div><strong>Baujahr:</strong><br/>{property.buildYear}</div>}
                      {property.condition && <div><strong>Zustand:</strong><br/>{property.condition}</div>}
                    </div>
                  </RevealSection>

                  {property.energy && (
                    <RevealSection className="property-section" delay={80}>
                      <h2 className="property-section-title">Energie & Heizung</h2>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem', color: 'var(--navy)' }}>
                        {property.energy.heatingType && <div><strong>Heizungsart:</strong><br/>{property.energy.heatingType}</div>}
                        {property.energy.firing && <div><strong>Befeuerung:</strong><br/>{property.energy.firing}</div>}
                        {property.energy.energyPassType && <div><strong>Energieausweistyp:</strong><br/>{property.energy.energyPassType}</div>}
                        {property.energy.energyConsumption && <div><strong>Energieverbrauch:</strong><br/>{property.energy.energyConsumption}</div>}
                      </div>
                    </RevealSection>
                  )}
                </>
              )}

              {property.description && (
                <RevealSection className="property-section">
                  <h2 className="property-section-title">Über diese Immobilie</h2>
                  <p className="property-description">{property.description}</p>
                </RevealSection>
              )}

              {property.amenities && property.amenities.length > 0 && (
                <RevealSection className="property-section">
                  <h2 className="property-section-title">Ausstattung</h2>
                  <ul className="property-amenities-list">
                    {property.amenities.map((amenity, idx) => (
                      <li key={idx}>{amenity}</li>
                    ))}
                  </ul>
                </RevealSection>
              )}

              <PropertyMediaTabs property={property} />

              <PropertyLocation locationData={property.locationData} />
            </div>

            <div className="property-side-col">
              <MortgageCalculator priceStr={property.price} financials={property.financials} />

              <PropertyPOIs locationData={property.locationData} />

              <RevealSection
                className="property-sidebar-widget agent-widget"
                variant="reveal-scale"
                threshold={0.3}
              >
                <h3>Interessiert an dieser Immobilie?</h3>
                <p>Unsere Berater stehen Ihnen für weitere Informationen und zur Vereinbarung eines Besichtigungstermins zur Verfügung.</p>
                <div style={{ marginTop: '1.5rem', display: 'flex' }}>
                  <Link
                    href={inquiryHref}
                    className="explore-btn explore-btn-dark"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                  >
                    Kontakt aufnehmen
                    <span className="explore-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </RevealSection>
            </div>
          </div>

          {related.length > 0 && (
            <section className="explore-section" style={{ padding: '2rem 0 6rem' }}>
              <div className="explore-container">
                <div className="explore-header">
                  <div className="explore-header-left">
                    <div className="explore-subtitle">
                      <span className="dot"></span> Weiterstöbern
                    </div>
                    <h2 className="explore-headline">Weitere Residenzen</h2>
                  </div>
                </div>
                <div className="explore-grid">
                  {related.map((r, i) => (
                    <RevealCard key={r.id} delay={i * 90}>
                      <PropertyCard
                        id={r.id}
                        imageSrc={r.imageSrc}
                        type={r.type}
                        title={r.title}
                        price={r.price}
                        location={r.location}
                        specs={r.specs}
                        transactionType={r.transactionType}
                        detailedSpecs={r.detailedSpecs}
                        galleryImages={r.galleryImages}
                      />
                    </RevealCard>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
