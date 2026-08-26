import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Reference } from "@/config";
import { useTranslations } from "next-intl";

export default function ReferenceCard({ reference, index = 0 }: { reference: Reference; index?: number }) {
  const t = useTranslations("CTA");
  return (
    <Link
      href={`/references/${reference.slug}`}
      className={`reveal stagger-${Math.min(index + 1, 6)} group cursor-pointer block`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
        <Image
          src={reference.image}
          alt={reference.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-[0.62rem] tracking-[0.12em] text-white uppercase font-bold">
          {reference.category}
        </div>
        <div className="absolute bottom-4 left-4 z-20 text-[0.65rem] tracking-[0.1em] text-white/80 font-body uppercase">
          {reference.location} &middot; {reference.year}
        </div>
      </div>

      <div className="px-1">
        <h3 className="font-display text-2xl text-[var(--navy)] mb-2 group-hover:text-[var(--bronze)] transition-colors duration-300">
          {reference.title}
        </h3>
        <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed mb-4">{reference.summary}</p>
        <span className="cta-btn cta-btn-ghost text-[0.65rem] !px-4 !py-2">
          {t('readFullStory')}
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
