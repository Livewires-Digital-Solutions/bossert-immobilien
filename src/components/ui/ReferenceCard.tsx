import Image from "next/image";
import Link from "next/link";
import { Reference } from "@/config";

export default function ReferenceCard({ reference, index = 0 }: { reference: Reference; index?: number }) {
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
        <span className="text-[0.65rem] font-body text-[var(--bronze)] tracking-[0.12em] uppercase border border-[var(--bronze)]/30 px-3 py-1 rounded-full group-hover:bg-[var(--bronze)] group-hover:text-[var(--navy)] transition-all duration-300 inline-block">
          View Case Study
        </span>
      </div>
    </Link>
  );
}
