import { notFound } from 'next/navigation';
import { fetchOnOfficePropertyById, fetchOnOfficeProperties } from '@/lib/onoffice';
import { mockProperties } from '@/data/properties';
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

// Pre-generate static pages dynamically
export async function generateStaticParams() {
  const properties = await fetchOnOfficeProperties();
  return properties.map((c) => ({ id: c.id }));
}

export const revalidate = 300; // 5-minute ISR

export default async function PropertyDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  let property = await fetchOnOfficePropertyById(resolvedParams.id);
  if (!property) {
    property = mockProperties.find((p) => p.id === resolvedParams.id) || null;
  }

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
              {/* Key Facts Section */}
              <section className="property-section">
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
              </section>

              {/* Energy Details Section */}
              {property.energy && (
                <section className="property-section">
                  <h2 className="property-section-title">Energie & Heizung</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem', color: 'var(--navy)' }}>
                    {property.energy.heatingType && <div><strong>Heizungsart:</strong><br/>{property.energy.heatingType}</div>}
                    {property.energy.firing && <div><strong>Befeuerung:</strong><br/>{property.energy.firing}</div>}
                    {property.energy.energyPassType && <div><strong>Energieausweistyp:</strong><br/>{property.energy.energyPassType}</div>}
                    {property.energy.energyConsumption && <div><strong>Energieverbrauch:</strong><br/>{property.energy.energyConsumption}</div>}
                  </div>
                </section>
              )}

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
