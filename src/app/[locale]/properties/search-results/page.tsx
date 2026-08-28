import { Link } from "@/i18n/routing";
import PageHero from "@/components/ui/PageHero";
import PropertyCard from "@/components/ui/PropertyCard";
import { mockProperties } from "@/lib/mock-data";
import { getTranslations } from "next-intl/server";
import { PropertyType, PropertyStatus } from "@/config";

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const t = await getTranslations("CTA");
  const params = await searchParams;
  const q = (typeof params.q === "string" ? params.q : "").toLowerCase();
  const location = typeof params.location === "string" ? params.location : "All Locations";
  const type = typeof params.type === "string" ? params.type : "All Types";
  const price = typeof params.price === "string" ? params.price : "Any Price";

  const dbProperties = mockProperties;
  // Map mockProperties to the expected format for PropertyCard
  // We need to provide 'title', 'image', 'images' which are mapped in properties page usually.
  const mappedProperties = dbProperties.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.titleEn, // Using English as default for search
    type: p.type as PropertyType,
    location: p.location,
    city: p.city,
    sqm: p.sqm,
    plotSqm: p.plotSqm ?? undefined,
    rooms: p.rooms,
    bathrooms: p.bathrooms,
    yearBuilt: p.yearBuilt,
    energyClass: p.energyClass,
    price: p.price,
    status: p.status as PropertyStatus,
    description: p.descriptionEn,
    agent: p.agent,
    image: p.images[0]?.url || "",
    images: p.images.map(img => img.url),
    features: p.features.map(f => f.textEn),
  }));

  const results = mappedProperties.filter((p) => {
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    const matchLocation = location === "All Locations" || p.city === location;
    const matchType = type === "All Types" || p.type === type;
    const matchPrice = (() => {
      const num = parseFloat(p.price.replace(/[^0-9.]/g, ""));
      if (price === "Any Price") return true;
      if (price === "Under €2M") return num < 2000000;
      if (price === "€2M – €4M") return num >= 2000000 && num <= 4000000;
      if (price === "Over €4M") return num > 4000000;
      return true;
    })();
    return matchQ && matchLocation && matchType && matchPrice;
  });

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="Search Results"
        subtitle={`${results.length} ${results.length === 1 ? "Property" : "Properties"} Found`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Properties", href: "/properties" }, { label: "Search Results" }]}
      />

      <section className="py-20 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <p className="font-body text-sm text-[var(--foreground)]/60">
              Showing results {q && <>for &ldquo;<span className="text-[var(--navy)]">{q}</span>&rdquo;</>}
            </p>
            <Link
              href="/properties/search"
              className="text-sm font-body uppercase tracking-[0.15em] border-b border-[var(--navy)] pb-1 text-[var(--navy)] hover:text-[var(--bronze)] hover:border-[var(--bronze)] transition-colors inline-block w-max"
            >
              {t('refineSearch')}
            </Link>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-3xl text-[var(--navy)]/40 mb-3">No properties found</p>
              <p className="font-body text-sm text-[var(--foreground)]/50 mb-8">Try adjusting your search criteria</p>
              <Link href="/properties/search" className="cta-btn !bg-[var(--navy)] !text-[var(--cream)]">
                {t('refineSearch')}
                <span className="cta-btn-icon !bg-[var(--cream)] !text-[var(--navy)]" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="6" x2="10" y2="6" />
                    <polyline points="6.5,2.5 10,6 6.5,9.5" />
                  </svg>
                </span>
              </Link>
            </div>
          ) : (
            <div 
              key={`${q}-${location}-${type}-${price}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {results.map((property, idx) => (
                <PropertyCard key={property.id} property={property} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
