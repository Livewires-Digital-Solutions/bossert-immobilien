"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PROPERTIES } from "@/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PropertyCard from "@/components/ui/PropertyCard";

const LOCATIONS = ["All Locations", "Wiesbaden", "Frankfurt", "Mainz", "Kronberg"];
const TYPES = ["All Types", "Villa", "Penthouse", "Apartment", "House"];
const PRICES = ["Any Price", "Under €2M", "€2M – €4M", "Over €4M"];

const QUICK_LINKS = [
  { href: "/properties/search", label: "Advanced Search" },
  { href: "/properties/map", label: "Map View" },
  { href: "/properties/search-profile", label: "Save Search Profile" },
];

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [type, setType] = useState("All Types");
  const [price, setPrice] = useState("Any Price");

  useScrollReveal();

  const filtered = PROPERTIES.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
    const matchLocation = location === "All Locations" || p.city === location;
    const matchType = type === "All Types" || p.type === type;
    const matchPrice = (() => {
      const num = parseFloat(p.price.replace(/[^0-9.]/g, ""));
      if (price === "Any Price") return true;
      if (price === "Under €2M") return num < 2;
      if (price === "€2M – €4M") return num >= 2 && num <= 4;
      if (price === "Over €4M") return num > 4;
      return true;
    })();
    return matchSearch && matchLocation && matchType && matchPrice;
  });

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* ── Premium Search Hero ──────────────────────────────────────── */}
      <section className="relative w-full min-h-[65vh] md:min-h-[75vh] flex flex-col justify-center bg-[var(--navy)] overflow-hidden pt-32 pb-20 px-6 md:px-12">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Property Background" 
            fill 
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>

        {/* Faded Gradient (Navy from left to transparent right) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#042433] via-[#042433]/90 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#042433]/50 via-transparent to-[#042433]/30 pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-start text-left">
          <p className="anim-fade-up font-body text-[var(--bronze)] text-[0.7rem] md:text-xs tracking-[0.3em] uppercase mb-4 pl-1 border-l-2 border-[var(--bronze)] ml-1">
            Exclusive Portfolio
          </p>

          <h1
            className="anim-fade-up delay-1 font-display text-[var(--cream)] mb-10 italic pr-4 max-w-2xl"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", lineHeight: 1.05 }}
          >
            Find Your Property
          </h1>

          <div className="anim-fade-up delay-2 relative w-full max-w-2xl mb-6">
            <div className="relative flex items-center">
              <svg className="absolute left-5 text-[var(--cream)]/50 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by city, neighbourhood or property name…"
                className="w-full pl-14 pr-36 py-4 md:py-5 bg-[#02121A]/60 backdrop-blur-md border border-[var(--cream)]/15 rounded-full text-[var(--cream)] placeholder-[var(--cream)]/40 font-body text-sm outline-none focus:border-[var(--bronze)]/70 focus:bg-[#02121A]/80 transition-all shadow-lg"
              />
              <button className="absolute right-2 bg-[var(--cream)] hover:bg-[var(--bronze)] text-[var(--navy)] hover:text-[var(--cream)] font-body text-[0.7rem] tracking-[0.15em] uppercase font-bold px-6 py-3 rounded-full transition-all">
                Search
              </button>
            </div>
          </div>

          <div className="anim-fade-up delay-3 flex flex-wrap justify-start gap-3 w-full max-w-2xl">
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="appearance-none bg-[#02121A]/60 backdrop-blur-md border border-[var(--cream)]/15 text-[var(--cream)] font-body text-xs tracking-[0.08em] pl-5 pr-10 py-3 rounded-full outline-none focus:border-[var(--bronze)]/70 cursor-pointer transition-colors hover:bg-[#02121A]/80"
              >
                {LOCATIONS.map((l) => <option key={l} value={l} className="bg-[var(--navy)] text-[var(--cream)]">{l}</option>)}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--cream)]/50" width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 3l4 4 4-4" /></svg>
            </div>

            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="appearance-none bg-[#02121A]/60 backdrop-blur-md border border-[var(--cream)]/15 text-[var(--cream)] font-body text-xs tracking-[0.08em] pl-5 pr-10 py-3 rounded-full outline-none focus:border-[var(--bronze)]/70 cursor-pointer transition-colors hover:bg-[#02121A]/80"
              >
                {TYPES.map((t) => <option key={t} value={t} className="bg-[var(--navy)] text-[var(--cream)]">{t}</option>)}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--cream)]/50" width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 3l4 4 4-4" /></svg>
            </div>

            <div className="relative">
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="appearance-none bg-[#02121A]/60 backdrop-blur-md border border-[var(--cream)]/15 text-[var(--cream)] font-body text-xs tracking-[0.08em] pl-5 pr-10 py-3 rounded-full outline-none focus:border-[var(--bronze)]/70 cursor-pointer transition-colors hover:bg-[#02121A]/80"
              >
                {PRICES.map((p) => <option key={p} value={p} className="bg-[var(--navy)] text-[var(--cream)]">{p}</option>)}
              </select>
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--cream)]/50" width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 3l4 4 4-4" /></svg>
            </div>
          </div>

          {/* Quick links to sibling Properties pages */}
          <div className="anim-fade-in delay-6 flex flex-wrap justify-start gap-3 mt-8 pt-8 border-t border-[var(--cream)]/10 w-full max-w-2xl">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.65rem] font-body text-[var(--cream)]/70 hover:text-[var(--bronze)] tracking-[0.14em] uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 right-6 md:right-12 z-10 font-body text-[var(--cream)] text-xs tracking-[0.15em] bg-[#02121A]/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[var(--cream)]/10">
          {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
        </div>
      </section>

      {/* ── Property Grid ───────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[1400px] mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-3xl text-[var(--navy)]/40 mb-3">No properties found</p>
              <p className="font-body text-sm text-[var(--foreground)]/50">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filtered.map((property, idx) => (
                <PropertyCard key={property.id} property={property} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
