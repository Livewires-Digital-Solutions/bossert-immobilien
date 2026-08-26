import Image from "next/image";
import Link from "next/link";
import { Property } from "@/config";

export default function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className={`reveal stagger-${Math.min(index + 1, 6)} group cursor-pointer block`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
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
          <span className="text-[0.65rem] font-body text-[var(--bronze)] tracking-[0.12em] uppercase border border-[var(--bronze)]/30 px-3 py-1 rounded-full group-hover:bg-[var(--bronze)] group-hover:text-[var(--navy)] transition-all duration-300">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
