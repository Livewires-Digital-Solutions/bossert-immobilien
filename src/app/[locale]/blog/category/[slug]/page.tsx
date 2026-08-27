import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { BLOG_CATEGORIES } from "@/config";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = BLOG_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.label} – Blog – Bossert Immobilien`,
    description: category.description,
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug, locale } = await params;
  const category = BLOG_CATEGORIES.find((c) => c.slug === slug);
  
  if (!category) notFound();

  const dbArticles = await prisma.blogPost.findMany({
    where: { category: category.label, published: true },
    orderBy: { createdAt: "desc" },
  });

  const articles = dbArticles.map((p) => ({
    slug: p.slug,
    category: p.category,
    title: locale === 'de' ? p.titleDe : p.titleEn,
    excerpt: locale === 'de' ? p.excerptDe : p.excerptEn,
    image: p.image,
    date: p.date,
    readTime: p.readTime,
    author: p.author,
  }));

  const tBlog = await getTranslations({ locale, namespace: "Blog" });
  const t = await getTranslations({ locale, namespace: "CTA" });

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title={category.label}
        subtitle="Category"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: category.label },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=2000&q=80"
      />

      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl text-[var(--navy)] mb-4">{category.label}</h2>
            <p className="font-body text-lg text-[var(--foreground)]/70 leading-relaxed">{category.description}</p>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {articles.map((post, idx) => (
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
          ) : (
            <div className="py-20 text-center border border-[var(--navy)]/10 rounded-3xl bg-[var(--cream)]">
              <p className="font-body text-lg text-[var(--foreground)]/60">{tBlog('noArticlesFound')}</p>
              <Link href="/blog" className="mt-6 cta-btn cta-btn-ghost inline-flex">
                {tBlog('backToBlog')}
                <span className="cta-btn-icon" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" /></svg>
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
