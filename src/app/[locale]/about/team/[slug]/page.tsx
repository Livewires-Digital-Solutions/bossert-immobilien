import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import DetailHero from "@/components/ui/DetailHero";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const members = await prisma.teamMember.findMany({ select: { slug: true } });
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;
  const member = await prisma.teamMember.findUnique({ where: { slug } });
  if (!member) return {};
  return {
    title: `${member.name} – Bossert Immobilien`,
    description: (params.locale === 'de' ? member.bioDe : member.bioEn).slice(0, 155),
  };
}

export default async function TeamMemberPage(props: Props) {
  const params = await props.params;
  const { slug, locale } = params;
  
  const member = await prisma.teamMember.findUnique({ where: { slug } });
  if (!member) notFound();

  const t = await getTranslations({ locale, namespace: "CTA" });

  const bio = locale === 'de' ? member.bioDe : member.bioEn;
  const specialties = member.specialties as string[];
  const languages = member.languages as string[];

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <DetailHero
        image={member.image}
        eyebrow={member.role}
        title={member.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Team", href: "/about/team" },
          { label: member.name },
        ]}
      />

      {/* ── Bio + Details ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Main bio */}
          <div className="md:col-span-2">
            <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4 block">
              Biography
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--navy)] mb-8">
              {member.name}
            </h2>
            <p className="font-body text-[var(--foreground)]/70 text-base leading-relaxed mb-6">
              {bio}
            </p>
          </div>

          {/* Sidebar details */}
          <aside className="flex flex-col gap-8">
            {/* Specialties */}
            <div className="reveal stagger-1">
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-3">Specialties</p>
              <ul className="flex flex-col gap-2">
                {specialties.map((s) => (
                  <li key={s} className="flex items-center gap-2 font-body text-sm text-[var(--foreground)]/75">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--bronze)] shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div className="reveal stagger-2">
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-3">Languages</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span key={lang} className="text-[0.65rem] font-body text-[var(--bronze)] tracking-[0.1em] uppercase border border-[var(--bronze)]/30 px-3 py-1 rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="reveal stagger-3 border-t border-[var(--navy)]/10 pt-6">
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-3">Contact Directly</p>
              <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="font-body text-sm text-[var(--foreground)]/70 hover:text-[var(--navy)] transition-colors block mb-1">{member.phone}</a>
              <a href={`mailto:${member.email}`} className="font-body text-sm text-[var(--foreground)]/70 hover:text-[var(--navy)] transition-colors block mb-4">{member.email}</a>
              <Link href={`/contact?agent=${slug}`} className="cta-btn cta-btn-ghost text-xs !px-4 !py-2 inline-flex w-max">
                Contact {member.name.split(" ")[0]}
                <span className="cta-btn-icon !w-6 !h-6" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                  </svg>
                </span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── CTA Band ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[700px] mx-auto text-center">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4 block">Work with {member.name.split(" ")[0]}</span>
          <h2 className="font-display text-4xl text-[var(--navy)] mb-6">Ready to find your ideal property?</h2>
          <p className="font-body text-[var(--foreground)]/70 text-base leading-relaxed mb-10">
            Reach out directly, or browse our current portfolio to find your next exceptional home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/contact?agent=${slug}`} className="cta-btn !bg-[var(--navy)] !text-[var(--cream)]" id="member-contact-cta">
              Schedule a Meeting
              <span className="cta-btn-icon !bg-[var(--cream)] !text-[var(--navy)]" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                </svg>
              </span>
            </Link>
            <Link href="/properties" className="cta-btn" id="member-properties-cta">
              {t('exploreProperties')}
              <span className="cta-btn-icon" aria-hidden="true">
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
