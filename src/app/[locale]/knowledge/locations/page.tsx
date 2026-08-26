import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ArticleCard from "@/components/ui/ArticleCard";
import { ARTICLES, KNOWLEDGE_CATEGORIES, LOCATIONS } from "@/config";
import type { KnowledgeCategory } from "@/config";
import type { Metadata } from "next";

const CATEGORY: KnowledgeCategory = "Locations";
const cat = KNOWLEDGE_CATEGORIES.find((c) => c.label === CATEGORY)!;

export const metadata: Metadata = {
  title: `Locations – Knowledge – Bossert Immobilien`,
  description: cat.description,
};

export default function LocationsPage() {
  const articles = ARTICLES.filter((a) => a.category === CATEGORY);
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="Locations"
        subtitle={cat.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Knowledge", href: "/knowledge" },
          { label: "Locations" },
        ]}
      />

      {/* ── Location Cards ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader eyebrow="Our Markets" title="The neighbourhoods we know best." className="mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {LOCATIONS.map((loc, i) => (
              <div key={loc.slug} className={`reveal stagger-${i + 1} relative overflow-hidden rounded-2xl group`}>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
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
              </div>
            ))}
          </div>

          {/* ── Location Articles ───────────────────────────────────────── */}
          <SectionHeader eyebrow="Location Guides" title="In-depth neighbourhood guides." className="mb-12" />
          {articles.length === 0 ? (
            <p className="font-body text-base text-[var(--foreground)]/50">No location guides published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {articles.map((article, idx) => (
                <ArticleCard key={article.slug} article={article} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
