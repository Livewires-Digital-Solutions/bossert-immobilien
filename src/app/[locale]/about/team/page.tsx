import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import TeamCard from "@/components/ui/TeamCard";
import { TEAM_MEMBERS } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team – Bossert Immobilien",
  description:
    "Meet the expert advisors behind Bossert Immobilien — three decades of combined local market knowledge, discretion, and proven results.",
};

export default function TeamPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="Our Team"
        subtitle="People who know the market"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Team" },
        ]}
      />

      {/* ── Team Grid ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader
            eyebrow="Our People"
            title="The experts behind every transaction."
            description="Each member of our team brings deep local knowledge, professional discretion, and a genuine commitment to achieving the best outcome for every client."
            align="center"
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((member, idx) => (
              <TeamCard key={member.slug} member={member} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Join Band ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 bg-[var(--navy)]">
        <div className="max-w-[700px] mx-auto text-center">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4 block">
            Join Our Team
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--cream)] mb-6">
            We&rsquo;re always looking for exceptional talent.
          </h2>
          <p className="font-body text-[var(--cream)]/70 text-base leading-relaxed mb-10">
            If you share our commitment to excellence and discretion, we&apos;d love to hear from you.
          </p>
          <a href="mailto:careers@bossert-immobilien.de" className="cta-btn" id="team-careers-cta">
            Send Us Your CV
            <span className="cta-btn-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
              </svg>
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
