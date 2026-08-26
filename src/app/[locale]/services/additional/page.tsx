import { notFound } from "next/navigation";
import Link from "next/link";
import DetailHero from "@/components/ui/DetailHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICES_DETAIL } from "@/config";
import type { Metadata } from "next";

const SLUG = "additional";

export const metadata: Metadata = {
  title: "Additional Services – Bossert Immobilien",
  description:
    "Interior design, financing partners, relocation support, and legal coordination — everything around the transaction, through our trusted partner network.",
};

export default function AdditionalServicesPage() {
  const svc = SERVICES_DETAIL.find((s) => s.slug === SLUG);
  if (!svc) notFound();

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <DetailHero
        image={svc.image}
        eyebrow={svc.tagline}
        title={svc.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: svc.title },
        ]}
      />

      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="reveal-left">
              <SectionHeader eyebrow={svc.tagline} title={svc.title} description={svc.intro} />
            </div>
            <div className="reveal-right grid grid-cols-1 sm:grid-cols-2 gap-6">
              {svc.features.map((feat, i) => (
                <div key={feat.title} className={`reveal stagger-${(i % 4) + 1} p-6 border border-[var(--navy)]/10 rounded-xl bg-[var(--cream)]`}>
                  <h3 className="font-display text-lg text-[var(--navy)] mb-3">{feat.title}</h3>
                  <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed">{feat.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10 bg-[var(--navy)]">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-display text-4xl text-[var(--cream)] mb-6">Your complete property partner.</h2>
          <p className="font-body text-[var(--cream)]/70 text-base leading-relaxed mb-10">
            From the first conversation to move-in day, we connect you with the right experts at every stage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="cta-btn" id="additional-contact-cta">
              Get in Touch
              <span className="cta-btn-icon" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                </svg>
              </span>
            </Link>
            <Link href="/services" className="cta-btn !bg-transparent !text-[var(--cream)] !border !border-[var(--cream)]/20" id="additional-services">
              All Services
              <span className="cta-btn-icon !bg-[var(--cream)]/10 !text-[var(--cream)]" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
