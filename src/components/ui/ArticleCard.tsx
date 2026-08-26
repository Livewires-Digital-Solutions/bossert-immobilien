import Image from "next/image";
import Link from "next/link";
import { Article } from "@/config";

export default function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  return (
    <Link
      href={`/knowledge/${article.slug}`}
      className={`reveal stagger-${Math.min(index + 1, 6)} group cursor-pointer block`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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
        <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed">{article.excerpt}</p>
      </div>
    </Link>
  );
}
