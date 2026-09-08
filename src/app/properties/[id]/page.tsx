import { notFound } from 'next/navigation';
import { fetchOnOfficePropertyById, PROPERTY_CONFIGS } from '@/lib/onoffice';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyHeader from '@/components/property/PropertyHeader';
import PropertyMediaTabs from '@/components/property/PropertyMediaTabs';
import PropertyLocation from '@/components/property/PropertyLocation';
import MortgageCalculator from '@/components/property/MortgageCalculator';
import PropertyPOIs from '@/components/property/PropertyPOIs';
import Button from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Pre-generate static pages for all 3 known property external IDs
export async function generateStaticParams() {
  return PROPERTY_CONFIGS.map((c) => ({ id: c.externalId }));
}

export const revalidate = 300; // 5-minute ISR

export default async function PropertyDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const property = await fetchOnOfficePropertyById(resolvedParams.id);

  if (!property) {
    notFound();
  }

  return (
    <main style={{ backgroundColor: 'var(--cream)', minHeight: '100vh', paddingTop: '160px' }}>
      <Navbar invertOnLoad={true} />

      <div className="inner-page-container">
        <PropertyGallery images={property.galleryImages} fallbackImage={property.imageSrc} />

        <div className="property-content-wrapper">
          <PropertyHeader property={property} />

          <div className="property-details-grid">
            <div className="property-main-col">
              {/* Description Section */}
              {property.description && (
                <section className="property-section">
                  <h2 className="property-section-title">Über diese Immobilie</h2>
                  <p className="property-description">{property.description}</p>
                </section>
              )}

              {/* Amenities Section */}
              {property.amenities && property.amenities.length > 0 && (
                <section className="property-section">
                  <h2 className="property-section-title">Ausstattung</h2>
                  <ul className="property-amenities-list">
                    {property.amenities.map((amenity, idx) => (
                      <li key={idx}>{amenity}</li>
                    ))}
                  </ul>
                </section>
              )}

              <PropertyMediaTabs property={property} />

              <PropertyLocation locationData={property.locationData} />
            </div>

            <div className="property-side-col">
              <MortgageCalculator priceStr={property.price} financials={property.financials} />

              <PropertyPOIs locationData={property.locationData} />

              <div className="property-sidebar-widget agent-widget">
                <h3>Interessiert an dieser Immobilie?</h3>
                <p>Unsere Berater stehen Ihnen für weitere Informationen und zur Vereinbarung eines Besichtigungstermins zur Verfügung.</p>
                <div style={{ marginTop: '1.5rem', display: 'flex' }}>
                  <Button variant="dark" style={{ width: '100%', justifyContent: 'space-between' }}>Kontakt aufnehmen</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
