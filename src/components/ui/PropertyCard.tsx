import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Property } from "@/config";
import { useTranslations } from "next-intl";

export default function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  const t = useTranslations("CTA");

  return (
    <Link
      href={`/properties/${property.slug}`}
      className={`reveal stagger-${Math.min(index + 1, 6)} group cursor-pointer block transform transition-all duration-700 ease-out-expo hover:-translate-y-1`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-[0_20px_40px_rgba(4,36,51,0.12)] transition-shadow duration-[1.2s] ease-out-expo">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out-expo"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div
          className={`absolute top-4 left-4 z-20 px-3 py-1 backdrop-blur-md rounded-full border text-[0.65rem] tracking-[0.1em] uppercase font-bold ${
            property.status === "Reserved"
              ? "bg-amber-400/20 border-amber-300/40 text-amber-100"
              : "bg-white/20 border-white/30 text-white"
          }`}
        >
          {property.status}
        </div>

        <div className="absolute bottom-4 right-4 z-20 px-3 py-1 bg-black/30 backdrop-blur-md rounded-full border border-white/15 text-[0.6rem] tracking-[0.1em] text-white font-body">
          {property.type}
        </div>
      </div>

      <div className="px-1">
        <h3 className="font-display text-2xl md:text-3xl text-[var(--navy)] mb-2 group-hover:text-[var(--bronze)] transition-colors duration-300">
          {property.title}
        </h3>
        <div className="flex items-center gap-3 text-xs font-body text-[var(--foreground)]/55 mb-4 flex-wrap tracking-[0.04em]">
          <span>{property.location}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--bronze)] shrink-0" />
          <span>{property.sqm} sqm</span>
          <span className="w-1 h-1 rounded-full bg-[var(--bronze)] shrink-0" />
          <span>{property.rooms} Rooms</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-body text-xl font-semibold text-[var(--navy)]">{property.price}</p>
          <span className="cta-btn cta-btn-ghost text-[0.65rem] !px-4 !py-2">
            {t('viewDetails')}
            <span className="cta-btn-icon !w-6 !h-6" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="6" x2="10" y2="6" />
                <polyline points="6.5,2.5 10,6 6.5,9.5" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
