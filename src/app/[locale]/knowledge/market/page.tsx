import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ArticleCard from "@/components/ui/ArticleCard";
import { ARTICLES, KNOWLEDGE_CATEGORIES } from "@/config";
import type { KnowledgeCategory } from "@/config";
import type { Metadata } from "next";

const CATEGORY: KnowledgeCategory = "Market";
const cat = KNOWLEDGE_CATEGORIES.find((c) => c.label === CATEGORY)!;

export const metadata: Metadata = {
  title: `Market Intelligence – Knowledge – Bossert Immobilien`,
  description: cat.description,
};

export default function MarketPage() {
  const articles = ARTICLES.filter((a) => a.category === CATEGORY);
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="Market"
        subtitle={cat.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Knowledge", href: "/knowledge" },
          { label: "Market" },
        ]}
      />
      <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader eyebrow="Market Intelligence" title="Market Reports & Insights" description={cat.description} className="mb-16" />
          {articles.length === 0 ? (
            <p className="font-body text-base text-[var(--foreground)]/50">No articles published yet. Check back soon.</p>
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
