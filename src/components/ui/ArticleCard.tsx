import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Article } from "@/config";
import { useTranslations } from "next-intl";

export default function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  const t = useTranslations("CTA");
  return (
    <Link
      href={`/knowledge/${article.slug}`}
      className={`reveal stagger-${Math.min(index + 1, 6)} group cursor-pointer block transform transition-all duration-700 ease-out-expo hover:-translate-y-1`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-[0_20px_40px_rgba(4,36,51,0.12)] transition-shadow duration-[1.2s] ease-out-expo">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out-expo"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-[0.62rem] tracking-[0.12em] text-white uppercase font-bold">
          {article.category}
        </div>
      </div>

      <div className="px-1">
        <div className="flex items-center gap-3 text-[0.65rem] font-body text-[var(--bronze)] mb-3 tracking-[0.1em] uppercase">
          <span>{article.date}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--bronze)]" />
          <span>{article.readTime}</span>
        </div>
        <h3 className="font-display text-xl md:text-2xl text-[var(--navy)] mb-3 group-hover:text-[var(--bronze)] transition-colors duration-300">
          {article.title}
        </h3>
        <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed mb-4">{article.excerpt}</p>
        <span className="cta-btn cta-btn-ghost text-[0.65rem] !px-4 !py-2">
          {t('readArticle')}
          <span className="cta-btn-icon !w-6 !h-6" aria-hidden="true">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
            </svg>
          </span>
        </span>
      </div>
    </Link>
  );
}
