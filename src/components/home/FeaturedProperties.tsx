import Image from "next/image";
import Link from "next/link";
import { PROPERTIES } from "@/config";

export default function FeaturedProperties() {
  const featured = PROPERTIES.slice(0, 3);

  return (
    <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="reveal">
            <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-3 block">
              Exclusive Portfolio
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-[var(--navy)]">
              Featured Properties
            </h2>
          </div>
          <Link
            href="/property"
            className="reveal stagger-2 text-sm font-body uppercase tracking-[0.15em] border-b border-[var(--navy)] pb-1 text-[var(--navy)] hover:text-[var(--bronze)] hover:border-[var(--bronze)] transition-colors inline-block w-max"
          >
            View All Properties
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featured.map((property, i) => (
            <Link key={property.id} href="/property" className={`reveal stagger-${i + 1} group cursor-pointer`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-5 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[var(--navy)]/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-[0.65rem] tracking-[0.1em] text-white uppercase font-bold z-10">
                  {property.status}
                </div>
              </div>
              <h3 className="font-display text-2xl text-[var(--navy)] mb-2 group-hover:text-[var(--bronze)] transition-colors">
                {property.title}
              </h3>
              <p className="font-body text-[var(--foreground)]/70 text-sm mb-4">
                {property.city} • {property.sqm} sqm • {property.rooms} Rooms
              </p>
              <p className="font-body text-lg font-medium text-[var(--navy)]">
                {property.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
