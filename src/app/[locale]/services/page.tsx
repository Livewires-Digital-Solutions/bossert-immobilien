import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICES_DETAIL } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services – Bossert Immobilien",
  description:
    "From brokerage and valuation to marketing and advisory — explore the full range of real estate services offered by Bossert Immobilien.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="Our Services"
        subtitle="Full-Service Real Estate Excellence"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* ── Intro ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader
            eyebrow="What We Do"
            title="End-to-end expertise for every property journey."
            description="Whether you are buying, selling, renting, or seeking strategic advice, our team delivers a level of service that matches the quality of the properties we represent."
            align="center"
            className="mb-20"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES_DETAIL.map((svc, i) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className={`reveal stagger-${(i % 6) + 1} group block`}
                id={`services-card-${svc.slug}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="text-[0.62rem] tracking-[0.1em] uppercase font-body text-white/80">{svc.tagline}</span>
                  </div>
                </div>
                <div className="px-1">
                  <h3 className="font-display text-2xl md:text-3xl text-[var(--navy)] mb-2 group-hover:text-[var(--bronze)] transition-colors duration-300">{svc.title}</h3>
                  <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed mb-4">{svc.intro.slice(0, 110)}…</p>
                  <span className="text-[0.65rem] font-body text-[var(--bronze)] tracking-[0.12em] uppercase border border-[var(--bronze)]/30 px-3 py-1 rounded-full group-hover:bg-[var(--bronze)] group-hover:text-[var(--navy)] transition-all duration-300 inline-block">
                    Learn More
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Band ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 bg-[var(--navy)]">
        <div className="max-w-[700px] mx-auto text-center">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4 block">
            Start Today
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--cream)] mb-6">
            Not sure which service is right for you?
          </h2>
          <p className="font-body text-[var(--cream)]/70 text-base leading-relaxed mb-10">
            Our advisors are happy to listen to your situation and recommend the most appropriate path forward — with no obligation.
          </p>
          <Link href="/contact" className="cta-btn" id="services-contact-cta">
            Speak to an Advisor
            <span className="cta-btn-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
