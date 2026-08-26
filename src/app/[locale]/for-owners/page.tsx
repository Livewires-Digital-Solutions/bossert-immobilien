import { Link } from "@/i18n/routing";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "For Owners – Bossert Immobilien",
  description:
    "Sell, rent out, or get your property valued with Bossert Immobilien. Expert guidance for property owners across the Rhine-Main region.",
};

const OWNER_SERVICES = [
  {
    href: "/for-owners/sell",
    eyebrow: "Sell",
    title: "Sell Your Property",
    description:
      "Benefit from our exclusive buyer network, premium marketing, and discreet off-market placement to achieve the best possible price.",
    ctaKey: "sellMyProperty",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/for-owners/rent-out",
    eyebrow: "Rent Out",
    title: "Rent Out Your Property",
    description:
      "From tenant screening to contract signing, we manage the entire lettings process on your behalf — attracting only the most qualified tenants.",
    ctaKey: "rentOutMyProperty",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    href: "/for-owners/valuation",
    eyebrow: "Valuation",
    title: "Property Valuation",
    description:
      "Get an accurate, market-driven assessment of your property's current value from our certified local experts — no obligation required.",
    ctaKey: "getValuation",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function ForOwnersPage() {
  const t = useTranslations("CTA");
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="For Owners"
        subtitle="Sell · Rent Out · Valuation"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "For Owners" }]}
      />

      {/* ── Intro ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader
            eyebrow="Owner Services"
            title="Everything you need, in one trusted partnership."
            description="Whether you're looking to sell, rent, or simply understand what your property is worth, our team provides the expertise, network, and discretion that discerning owners expect."
            align="center"
            className="mb-20"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {OWNER_SERVICES.map((svc, i) => (
              <Link
                key={svc.href}
                href={svc.href}
                className={`reveal stagger-${i + 1} group flex flex-col gap-6 p-8 border border-[var(--navy)]/10 rounded-2xl hover:border-[var(--bronze)]/50 hover:shadow-xl transition-all duration-500 bg-white`}
                id={`for-owners-${svc.eyebrow.toLowerCase().replace(" ", "-")}`}
              >
                <span className="text-[var(--bronze)] transition-transform duration-300 group-hover:-translate-y-1 block">
                  {svc.icon}
                </span>
                <div>
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body block mb-2">{svc.eyebrow}</span>
                  <h2 className="font-display text-2xl md:text-3xl text-[var(--navy)] mb-4 group-hover:text-[var(--bronze)] transition-colors duration-300">{svc.title}</h2>
                  <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed">{svc.description}</p>
                </div>
                <span className="mt-auto cta-btn cta-btn-ghost text-[0.65rem] !px-4 !py-2 w-max">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {t(svc.ctaKey as any)}
                  <span className="cta-btn-icon !w-6 !h-6" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="2" y1="6" x2="10" y2="6" />
                      <polyline points="6.5,2.5 10,6 6.5,9.5" />
                    </svg>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Bossert for Owners ──────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-[var(--navy)]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="Our Approach"
              title="Discreet. Professional. Results-driven."
              description="We don't just list properties — we strategically position them. Every mandate begins with a thorough valuation and a bespoke marketing strategy tailored to your property and timeline."
              dark
            />
            <ul className="mt-10 flex flex-col gap-4">
              {[
                "Access to 500+ pre-qualified buyers",
                "Off-market placement available",
                "Professional photography & cinematic video",
                "Dedicated advisor from first meeting to closing",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 font-body text-sm text-[var(--cream)]/75">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--bronze)] shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "98%", label: "Avg. % of Asking Price Achieved" },
              { num: "6 wks", label: "Average Time to Sale" },
              { num: "500+", label: "Successful Transactions" },
              { num: "30+", label: "Years of Regional Expertise" },
            ].map((stat, i) => (
              <div key={stat.label} className={`reveal stagger-${i + 1} stat-card px-6 py-6`}>
                <p className="font-display text-3xl text-[var(--cream)] mb-1">{stat.num}</p>
                <p className="text-[0.6rem] tracking-[0.18em] uppercase font-body text-[var(--bronze)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-[var(--navy)] mb-6">Start the conversation today.</h2>
          <p className="font-body text-[var(--foreground)]/70 text-base leading-relaxed mb-10">
            Our team is happy to provide a confidential, no-obligation discussion about your property and its potential.
          </p>
          <Link href="/contact" className="cta-btn !bg-[var(--navy)] !text-[var(--cream)]" id="for-owners-contact">
            Book a Consultation
            <span className="cta-btn-icon !bg-[var(--cream)] !text-[var(--navy)]" aria-hidden="true">
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
