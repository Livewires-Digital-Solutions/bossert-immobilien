import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import DetailHero from "@/components/ui/DetailHero";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/config";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} – Blog – Bossert Immobilien`,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug, locale } = await params;
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: "CTA" });
  const tBlog = await getTranslations({ locale, namespace: "Blog" });

  const category = BLOG_CATEGORIES.find((c) => c.label === article.category);
  const categorySlug = category ? category.slug : article.category.toLowerCase().replace(/\s+/g, '-');

  const related = BLOG_ARTICLES.filter((a) => a.category === article.category && a.slug !== slug).slice(0, 3);

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <DetailHero
        image={article.image}
        eyebrow={`${article.category} · ${article.readTime}`}
        title={article.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: article.category, href: `/blog/category/${categorySlug}` },
          { label: article.title },
        ]}
      />

      {/* ── Article Content ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Article body */}
          <article className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-[var(--navy)]/10">
              <span className="text-[0.62rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body border border-[var(--bronze)]/30 px-3 py-1 rounded-full">{article.category}</span>
              <span className="font-body text-xs text-[var(--foreground)]/50">{tBlog('publishedOn', { date: article.date })}</span>
              <span className="font-body text-xs text-[var(--foreground)]/50">{article.readTime}</span>
              <span className="font-body text-xs text-[var(--foreground)]/50">{tBlog('writtenBy', { author: article.author })}</span>
            </div>

            <div className="flex flex-col gap-6">
              <p className="font-body text-lg text-[var(--navy)] font-medium leading-[1.7] mb-4">
                {article.excerpt}
              </p>
              {article.content.map((para, i) => {
                // simple markdown bold parsing for text
                const parts = para.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={i} className="font-body text-base text-[var(--foreground)]/75 leading-[1.8]">
                    {parts.map((part, index) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={index} className="text-[var(--navy)]">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </p>
                );
              })}
            </div>

            {/* Author band */}
            <div className="mt-12 pt-8 border-t border-[var(--navy)]/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--navy)]/10 flex items-center justify-center shrink-0">
                <span className="font-display text-lg text-[var(--navy)]">{article.author.charAt(0)}</span>
              </div>
              <div>
                <p className="font-display text-base text-[var(--navy)]">{article.author}</p>
                <p className="font-body text-xs text-[var(--bronze)] tracking-[0.1em] uppercase">Bossert Immobilien</p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 flex flex-col gap-8">
              {/* Category link */}
              <div className="border border-[var(--navy)]/10 rounded-2xl p-6 bg-[var(--cream)]">
                <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4">{tBlog('relatedArticles')}</p>
                {related.length > 0 ? (
                  <ul className="flex flex-col gap-4">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link href={`/blog/${r.slug}`} className="group flex gap-3 items-start" id={`article-related-${r.slug}`}>
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                            <Image src={r.image} alt={r.title} fill className="object-cover" sizes="64px" />
                          </div>
                          <p className="font-body text-sm text-[var(--navy)] group-hover:text-[var(--bronze)] transition-colors leading-snug">{r.title}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-body text-sm text-[var(--foreground)]/55">{tBlog('noArticlesFound')}</p>
                )}
                <Link href={`/blog/category/${categorySlug}`} className="mt-6 inline-block text-[0.65rem] font-body text-[var(--bronze)] tracking-[0.12em] uppercase border border-[var(--bronze)]/30 px-3 py-1 rounded-full hover:bg-[var(--bronze)] hover:text-[var(--navy)] transition-all" id="article-cat-all">
                  {tBlog('articlesIn', { category: article.category })} →
                </Link>
              </div>

              {/* CTA */}
              <div className="border border-[var(--navy)]/10 rounded-2xl p-6 bg-[var(--navy)]">
                <p className="font-display text-lg text-[var(--cream)] mb-3">{t('talkToExpert')}</p>
                <Link href={`/contact?source=blog&ref=${article.slug}`} className="cta-btn !text-[0.65rem] w-full justify-center" id="article-contact-cta">
                  {t('sendMessage')}
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
    </div>
  );
}
