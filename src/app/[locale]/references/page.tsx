import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ReferenceCard from "@/components/ui/ReferenceCard";
import { REFERENCES } from "@/config";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "References – Bossert Immobilien",
  description:
    "A selection of completed transactions and client success stories from Bossert Immobilien — demonstrating our track record across villas, penthouses, and estate sales.",
};

export default function ReferencesPage() {
  const t = useTranslations("CTA");
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="References"
        subtitle="Our Track Record"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "References" }]}
      />

      {/* ── Intro ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <SectionHeader
              eyebrow="Proven Results"
              title="Transactions we are proud to share."
              description="A selection of completed mandates that illustrate our approach, our network, and the outcomes we achieve for our clients."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {REFERENCES.map((ref, idx) => (
              <ReferenceCard key={ref.id} reference={ref} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Band ────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-[var(--navy)]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrow="Client Words"
            title="What our clients say."
            align="center"
            dark
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REFERENCES.map((ref, i) => (
              <div key={ref.id} className={`reveal stagger-${i + 1} stat-card px-8 py-10`}>
                <blockquote>
                  <p className="font-display text-lg text-[var(--cream)] italic leading-relaxed mb-6">
                    &ldquo;{ref.testimonial.quote}&rdquo;
                  </p>
                  <footer>
                    <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body">{ref.testimonial.author}</span>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[700px] mx-auto text-center">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4 block">Start Your Story</span>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--navy)] mb-6">Become our next success story.</h2>
          <p className="font-body text-[var(--foreground)]/70 text-base leading-relaxed mb-10">
            Whether you are buying, selling, or renting — we would love to deliver you a result worth talking about.
          </p>
          <Link href="/for-owners" className="cta-btn !bg-[var(--navy)] !text-[var(--cream)]" id="references-contact-cta">
            {t('startSuccessStory')}
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
