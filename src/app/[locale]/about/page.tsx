import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPANY, TEAM_MEMBERS } from "@/config";
import TeamCard from "@/components/ui/TeamCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Bossert Immobilien – Our Story & Heritage",
  description:
    "Founded in 1991, Bossert Immobilien is the Rhine-Main region's leading luxury real estate agency. Discover our heritage, values, and expert team.",
};

const VALUES = [
  {
    num: "30+",
    label: "Years of Excellence",
    text: "Three decades of navigating the Rhine-Main market with discretion and precision.",
  },
  {
    num: "500+",
    label: "Properties Transacted",
    text: "An unmatched track record spanning villas, penthouses, and exclusive estates.",
  },
  {
    num: "€2B+",
    label: "Portfolio Value",
    text: "Trusted with some of the most significant private property transactions in the region.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="About Bossert"
        subtitle="Excellence in Real Estate Since 1991"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* ── Story Section ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal-left">
            <SectionHeader
              eyebrow="Our Heritage"
              title="Decades of trust, discretion, and market expertise."
              description="Founded in 1991, Bossert Immobilien has established itself as one of the most prestigious real estate agencies in the Rhine-Main region. We specialize in the brokerage of high-end residential properties — from landmark villas to landmark penthouses."
            />
            <p className="font-body text-[var(--foreground)]/70 text-base leading-relaxed mt-6">
              Our philosophy is simple: we treat every property as if it were our own, and every client like family. This uncompromising commitment to quality and service has allowed us to build a vast network of satisfied clients and a portfolio of exclusive off-market opportunities unavailable anywhere else.
            </p>
            <div className="mt-10 flex gap-4 flex-wrap">
              <Link href="/about/team" className="cta-btn !bg-[var(--navy)] !text-[var(--cream)]" id="about-meet-team">
                Meet the Team
                <span className="cta-btn-icon !bg-[var(--cream)] !text-[var(--navy)]" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                  </svg>
                </span>
              </Link>
              <Link href="/contact" className="cta-btn" id="about-contact">
                Get in Touch
                <span className="cta-btn-icon" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className="reveal-right relative aspect-square overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="Bossert Immobilien Office"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── Values / Stats — Dark Section ──────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-[var(--navy)]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrow="Why Bossert"
            title="Built on results, relationships, and reputation."
            align="center"
            dark
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <div
                key={v.num}
                className={`reveal stagger-${i + 1} stat-card px-8 py-10 flex flex-col gap-4`}
              >
                <p className="font-display text-5xl text-[var(--cream)]">{v.num}</p>
                <p className="text-[0.7rem] tracking-[0.2em] uppercase font-body text-[var(--bronze)]">{v.label}</p>
                <p className="font-body text-[var(--cream)]/70 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Preview ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <SectionHeader
              eyebrow="Our People"
              title="The experts behind every transaction."
            />
            <Link href="/about/team" className="cta-btn shrink-0" id="about-all-team">
              View Full Team
              <span className="cta-btn-icon" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((member, idx) => (
              <TeamCard key={member.slug} member={member} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Details Band ────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-10 bg-white border-t border-[var(--navy)]/10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div className="reveal stagger-1">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-2">Address</p>
            <p className="font-body text-sm text-[var(--foreground)]/70 leading-relaxed">
              {COMPANY.address.street}<br />
              {COMPANY.address.zip} {COMPANY.address.city}<br />
              {COMPANY.address.country}
            </p>
          </div>
          <div className="reveal stagger-2">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-2">Contact</p>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="font-body text-sm text-[var(--foreground)]/70 hover:text-[var(--navy)] transition-colors block">{COMPANY.phone}</a>
            <a href={`mailto:${COMPANY.email}`} className="font-body text-sm text-[var(--foreground)]/70 hover:text-[var(--navy)] transition-colors block">{COMPANY.email}</a>
          </div>
          <div className="reveal stagger-3">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-2">Office Hours</p>
            <p className="font-body text-sm text-[var(--foreground)]/70 leading-relaxed">
              {COMPANY.hours.weekdays}<br />
              {COMPANY.hours.saturday}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
