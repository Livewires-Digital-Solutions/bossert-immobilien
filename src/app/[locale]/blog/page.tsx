import { Link } from "@/i18n/routing";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Blog – Bossert Immobilien",
  description:
    "Stories, market insights, and expert perspectives from the Bossert Immobilien team. Explore our latest articles on real estate trends, lifestyle, and the Rhine-Main region.",
};

import { BLOG_CATEGORIES, BLOG_ARTICLES } from "@/config";

const featured = BLOG_ARTICLES.filter((p) => p.featured);
const rest = BLOG_ARTICLES.filter((p) => !p.featured);

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "CTA" });
  const tBlog = await getTranslations({ locale, namespace: "Blog" });
  const tNav = await getTranslations({ locale, namespace: "Navbar" });

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title={tNav('blog')}
        subtitle="Stories · Insights · Expert Views"
        breadcrumbs={[{ label: tNav('home'), href: "/" }, { label: tNav('blog') }]}
        backgroundImage="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=2000&q=80"
      />

      {/* Featured Posts */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            eyebrow="Featured Articles"
            title="Latest from our team."
            description="Perspectives, analysis, and advice from Bossert Immobilien specialists — written to help you make confident, informed decisions."
            className="mb-16"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
            {featured[0] && (
              <Link href={`/blog/${featured[0].slug}`} className="reveal stagger-1 group cursor-pointer block" id={`blog-featured-${featured[0].slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                  <Image src={featured[0].image} alt={featured[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-[0.62rem] tracking-[0.12em] text-white uppercase font-bold">{featured[0].category}</div>
                </div>
                <div className="px-1">
                  <div className="flex items-center gap-3 text-[0.65rem] font-body text-[var(--bronze)] mb-3 tracking-[0.1em] uppercase">
                    <span>{featured[0].date}</span><span className="w-1 h-1 rounded-full bg-[var(--bronze)]" /><span>{featured[0].readTime}</span><span className="w-1 h-1 rounded-full bg-[var(--bronze)]" /><span>{featured[0].author}</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl text-[var(--navy)] mb-3 group-hover:text-[var(--bronze)] transition-colors duration-300">{featured[0].title}</h2>
                  <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed mb-4">{featured[0].excerpt}</p>
                  <span className="cta-btn cta-btn-ghost text-[0.65rem] !px-4 !py-2 w-max">
                    {t('readArticle')}
                    <span className="cta-btn-icon !w-6 !h-6" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" /></svg>
                    </span>
                  </span>
                </div>
              </Link>
            )}
            <div className="flex flex-col gap-8">
              {featured.slice(1).map((post, idx) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className={`reveal stagger-${idx + 2} group cursor-pointer flex gap-6 border border-[var(--navy)]/10 rounded-2xl p-5 hover:border-[var(--bronze)]/50 hover:shadow-xl transition-all duration-500 bg-white`} id={`blog-featured-${post.slug}`}>
                  <div className="relative w-28 h-28 md:w-36 md:h-36 shrink-0 overflow-hidden rounded-xl">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="144px" />
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <div className="flex items-center gap-2 text-[0.62rem] font-body text-[var(--bronze)] tracking-[0.1em] uppercase">
                      <span>{post.category}</span><span className="w-1 h-1 rounded-full bg-[var(--bronze)]" /><span>{post.date}</span>
                    </div>
                    <h3 className="font-display text-lg md:text-xl text-[var(--navy)] group-hover:text-[var(--bronze)] transition-colors duration-300 leading-snug">{post.title}</h3>
                    <p className="font-body text-xs text-[var(--foreground)]/60 leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <span className="text-[0.62rem] font-body text-[var(--bronze)] tracking-[0.1em] uppercase flex items-center gap-2 group-hover:gap-3 transition-all mt-1">
                      {tBlog('readMore')}
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" /></svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader eyebrow="Browse by Topic" title="Find what interests you." description="Our blog covers every angle of the property world — from hard data to lifestyle inspiration." className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_CATEGORIES.map((cat, i) => (
              <Link key={cat.slug} href={`/blog/category/${cat.slug}`} className={`reveal stagger-${(i % 6) + 1} group p-6 border border-[var(--navy)]/10 rounded-2xl hover:border-[var(--bronze)]/50 hover:shadow-xl transition-all duration-500 bg-white flex flex-col gap-3`} id={`blog-cat-${cat.slug}`}>
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body">{cat.label}</span>
                <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed">{cat.description}</p>
                <span className="mt-auto text-[0.62rem] font-body text-[var(--bronze)] tracking-[0.12em] uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                  {t('readArticle')}
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles Grid */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <SectionHeader eyebrow="All Articles" title="More from the blog." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {rest.map((post, idx) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={`reveal stagger-${(idx % 6) + 1} group cursor-pointer block`} id={`blog-post-${post.slug}`}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-[0.62rem] tracking-[0.12em] text-white uppercase font-bold">{post.category}</div>
                </div>
                <div className="px-1">
                  <div className="flex items-center gap-3 text-[0.65rem] font-body text-[var(--bronze)] mb-3 tracking-[0.1em] uppercase">
                    <span>{post.date}</span><span className="w-1 h-1 rounded-full bg-[var(--bronze)]" /><span>{post.readTime}</span><span className="w-1 h-1 rounded-full bg-[var(--bronze)]" /><span>{post.author}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-[var(--navy)] mb-3 group-hover:text-[var(--bronze)] transition-colors duration-300">{post.title}</h3>
                  <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed mb-4">{post.excerpt}</p>
                  <span className="cta-btn cta-btn-ghost text-[0.65rem] !px-4 !py-2">
                    {t('readArticle')}
                    <span className="cta-btn-icon !w-6 !h-6" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" /></svg>
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 px-6 md:px-10 bg-[var(--navy)]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader eyebrow="Stay Informed" title="Get insights delivered to your inbox." description="Join over 2,000 property owners, buyers, and investors who receive our monthly market briefing — curated by the Bossert Immobilien team." dark />
            <div className="mt-10 flex gap-4 flex-wrap">
              <Link href="/contact?source=newsletter" className="cta-btn inline-flex" id="blog-newsletter-cta">
                {t('subscribeNewsletter')}
                <span className="cta-btn-icon" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" /></svg>
                </span>
              </Link>
              <Link href="/contact" className="cta-btn cta-btn-ghost inline-flex" id="blog-contact-cta">
                {t('talkToExpert')}
                <span className="cta-btn-icon" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" /></svg>
                </span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "9", label: "Articles Published This Year" },
              { num: "2,000+", label: "Newsletter Subscribers" },
              { num: "6", label: "Topic Categories" },
              { num: "Monthly", label: "Market Briefing Cadence" },
            ].map((stat, i) => (
              <div key={stat.label} className={`reveal stagger-${i + 1} stat-card px-6 py-6`}>
                <p className="font-display text-3xl text-[var(--cream)] mb-1">{stat.num}</p>
                <p className="text-[0.6rem] tracking-[0.18em] uppercase font-body text-[var(--bronze)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
