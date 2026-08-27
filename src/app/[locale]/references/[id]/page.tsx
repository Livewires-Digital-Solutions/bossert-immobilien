import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import DetailHero from "@/components/ui/DetailHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateStaticParams() {
  const references = await prisma.reference.findMany({ select: { slug: true } });
  return references.map((r) => ({ id: r.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;
  const ref = await prisma.reference.findUnique({ where: { slug: id } });
  if (!ref) return {};
  return {
    title: `${params.locale === 'de' ? ref.titleDe : ref.titleEn} – References – Bossert Immobilien`,
    description: params.locale === 'de' ? ref.summaryDe : ref.summaryEn,
  };
}

export default async function ReferenceDetailPage(props: Props) {
  const params = await props.params;
  const { id, locale } = params;
  
  const ref = await prisma.reference.findUnique({ 
    where: { slug: id },
    include: { images: { orderBy: { order: "asc" } } }
  });
  
  const t = await getTranslations({ locale, namespace: "CTA" });
  if (!ref) notFound();

  const title = locale === 'de' ? ref.titleDe : ref.titleEn;
  const description = locale === 'de' ? ref.descriptionDe : ref.descriptionEn;
  const images = ref.images.map(img => img.url);

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <DetailHero
        image={images[0]}
        eyebrow={`${ref.category} · ${ref.location} · ${ref.year}`}
        title={title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "References", href: "/references" },
          { label: title },
        ]}
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="reveal mb-12">
              <SectionHeader eyebrow="Case Study" title="What We Did" className="mb-6" />
              <p className="font-body text-base text-[var(--foreground)]/70 leading-relaxed">{description}</p>
            </div>

            {/* Gallery */}
            {images.length > 1 && (
              <div className="reveal mb-12">
                <h3 className="font-display text-2xl text-[var(--navy)] mb-6">Property Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                  {images.slice(1).map((img: string, i: number) => (
                    <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={img}
                        alt={`${title} — gallery ${i + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            <div className="reveal border-l-2 border-[var(--bronze)] pl-8 py-2">
              <blockquote>
                <p className="font-display text-xl italic text-[var(--navy)] leading-relaxed mb-4">
                  &ldquo;{ref.testimonialQuote}&rdquo;
                </p>
                <footer>
                  <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body">{ref.testimonialAuthor}</span>
                </footer>
              </blockquote>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 border border-[var(--navy)]/10 rounded-2xl p-8 bg-[var(--cream)]">
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-6">Transaction Summary</p>

              {[
                { label: "Category", value: ref.category },
                { label: "Location", value: ref.location },
                { label: "Year", value: ref.year },
              ].map(({ label, value }) => (
                <div key={label} className="mb-5 pb-5 border-b border-[var(--navy)]/10 last:border-0 last:mb-0 last:pb-0">
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-1">{label}</p>
                  <p className="font-body text-sm text-[var(--foreground)]/80">{value}</p>
                </div>
              ))}

              <div className="mt-6 pt-6 border-t border-[var(--navy)]/10">
                <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-2">Outcome</p>
                <p className="font-body text-sm text-[var(--foreground)]/80 leading-relaxed">{ref.result}</p>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <Link href="/for-owners" className="cta-btn !bg-[var(--navy)] !text-[var(--cream)] w-full justify-center" id={`ref-${ref.slug}-cta-primary`}>
                  {t('startSuccessStory')}
                  <span className="cta-btn-icon !bg-[var(--cream)] !text-[var(--navy)]" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                    </svg>
                  </span>
                </Link>
                <Link href="/for-owners" className="cta-btn cta-btn-ghost w-full justify-center" id={`ref-${ref.slug}-cta-sec`}>
                  {t('discussYourProperty')}
                  <span className="cta-btn-icon" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Back ─────────────────────────────────────────────────────────── */}
      <section className="py-12 px-6 md:px-10 bg-[var(--cream)] border-t border-[var(--navy)]/10">
        <div className="max-w-[1400px] mx-auto">
          <Link href="/references" className="font-body text-sm text-[var(--bronze)] hover:text-[var(--navy)] transition-colors flex items-center gap-2" id="ref-detail-back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9,2 4,7 9,12" />
            </svg>
            Back to References
          </Link>
        </div>
      </section>
    </div>
  );
}
