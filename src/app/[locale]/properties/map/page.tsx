import { Link } from "@/i18n/routing";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROPERTIES } from "@/config";
import { LOCATIONS } from "@/config";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Map View – Properties – Bossert Immobilien",
  description:
    "Browse Bossert Immobilien's exclusive property portfolio by location across Wiesbaden, Frankfurt, Mainz, and the Taunus.",
};

export default function MapPage() {
  const t = useTranslations("CTA");

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="Map View"
        subtitle="Properties by Location"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Properties", href: "/properties" },
          { label: "Map View" },
        ]}
      />

      {/* ── Location Cards Grid ─────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            eyebrow="Our Locations"
            title="Where we operate."
            description="Bossert Immobilien focuses exclusively on the Rhine-Main region's most sought-after residential locations — each with its own distinct character and market dynamic."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {LOCATIONS.map((loc, i) => (
              <Link
                key={loc.slug}
                href={`/properties?location=${loc.name}`}
                className={`reveal stagger-${i + 1} group relative overflow-hidden rounded-2xl block`}
                id={`map-location-${loc.slug}`}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl text-[var(--cream)] mb-2">{loc.name}</h3>
                  <p className="font-body text-sm text-[var(--cream)]/75 leading-relaxed mb-4 max-w-xs">{loc.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {loc.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-[0.55rem] tracking-[0.2em] uppercase font-body text-[var(--bronze)]">{stat.label}</p>
                        <p className="font-display text-base text-[var(--cream)]">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ── Property List by Location ───────────────────────────────── */}
          <SectionHeader
            eyebrow="All Listings"
            title="Properties by city."
            className="mb-12"
          />

          {["Wiesbaden", "Frankfurt", "Mainz", "Kronberg"].map((city) => {
            const cityProps = PROPERTIES.filter((p) => p.city === city);
            if (!cityProps.length) return null;
            return (
              <div key={city} className="mb-12">
                <h3 className="font-body text-[0.7rem] tracking-[0.25em] uppercase text-[var(--bronze)] mb-6 flex items-center gap-4">
                  {city}
                  <span className="flex-1 h-px bg-[var(--navy)]/10" />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cityProps.map((p) => (
                    <Link
                      key={p.id}
                      href={`/properties/${p.slug}`}
                      className="reveal group flex gap-4 items-center p-4 border border-[var(--navy)]/10 rounded-xl hover:border-[var(--bronze)]/40 hover:shadow-md transition-all duration-300"
                      id={`map-prop-${p.slug}`}
                    >
                      <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="80px" />
                      </div>
                      <div>
                        <h4 className="font-display text-base text-[var(--navy)] group-hover:text-[var(--bronze)] transition-colors">{p.title}</h4>
                        <p className="font-body text-xs text-[var(--foreground)]/55">{p.sqm} sqm · {p.rooms} rooms</p>
                        <p className="font-body text-sm font-semibold text-[var(--navy)] mt-1 mb-2">{p.price}</p>
                        <span className="cta-btn cta-btn-ghost text-[0.6rem] !px-3 !py-1 inline-flex w-max">
                          {t('viewThisProperty')}
                          <span className="cta-btn-icon !w-5 !h-5" aria-hidden="true">
                            <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                            </svg>
                          </span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
