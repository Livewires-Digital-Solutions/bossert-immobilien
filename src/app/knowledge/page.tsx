import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ArticleCard from "@/components/ui/ArticleCard";
import { ARTICLES, KNOWLEDGE_CATEGORIES } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Hub – Bossert Immobilien",
  description:
    "Practical guidance, market insights, and expert advice from the Bossert Immobilien team. Explore guides on buying, selling, valuation, renting, and more.",
};

export default function KnowledgePage() {
  const featured = ARTICLES.slice(0, 3);

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="Knowledge Hub"
        subtitle="Guides · Insights · Market Intelligence"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Knowledge" }]}
      />

      {/* ── Categories Grid ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            eyebrow="Browse by Topic"
            title="Everything you need to know."
            description="Our knowledge centre covers every stage of the property journey — from your first search to final handover."
            className="mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {KNOWLEDGE_CATEGORIES.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/knowledge/${cat.slug}`}
                className={`reveal stagger-${(i % 6) + 1} group p-6 border border-[var(--navy)]/10 rounded-2xl hover:border-[var(--bronze)]/50 hover:shadow-xl transition-all duration-500 bg-white flex flex-col gap-3`}
                id={`knowledge-cat-${cat.slug}`}
              >
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body">{cat.label}</span>
                <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed">{cat.description}</p>
                <span className="mt-auto text-[0.62rem] font-body text-[var(--bronze)] tracking-[0.12em] uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                  Explore
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          {/* ── Featured Articles ──────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <SectionHeader eyebrow="Latest Insights" title="Featured Articles" />
            <Link href="/knowledge/guides" className="cta-btn shrink-0" id="knowledge-all-guides">
              All Guides
              <span className="cta-btn-icon" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featured.map((article, idx) => (
              <ArticleCard key={article.slug} article={article} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Market Insight Banner ─────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-[var(--navy)]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="Market Intelligence"
              title="Quarterly Rhine-Main Market Outlook."
              description="Our team produces in-depth quarterly reports on pricing trends, supply, and buyer demand across Wiesbaden, Frankfurt, Mainz, and the Taunus."
              dark
            />
            <Link href="/knowledge/market" className="cta-btn mt-10 inline-flex" id="knowledge-market-outlook">
              Read the Outlook
              <span className="cta-btn-icon" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
                </svg>
              </span>
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
              alt="Rhine-Main Market Outlook"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="hero-overlay" aria-hidden="true" />
          </div>
        </div>
      </section>
    </div>
  );
}
