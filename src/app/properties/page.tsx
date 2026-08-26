"use client";

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
      <section className="relative w-full min-h-[65vh] flex flex-col items-center justify-center bg-[var(--navy)] overflow-hidden pt-24 pb-16 px-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.06]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[var(--bronze)]/10 blur-[90px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-3xl text-center">
          <p className="anim-fade-up font-body text-[var(--bronze)] text-[0.7rem] tracking-[0.3em] uppercase mb-4">
            Exclusive Portfolio
          </p>

          <h1
            className="anim-fade-up delay-1 font-display text-[var(--cream)] mb-10"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1 }}
          >
            Find Your Property
          </h1>

          <div className="anim-fade-up delay-2 relative w-full mb-6">
            <div className="relative flex items-center">
              <svg className="absolute left-5 text-[var(--cream)]/40 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by city, neighbourhood or property name…"
                className="w-full pl-12 pr-36 py-4 md:py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[var(--cream)] placeholder-[var(--cream)]/40 font-body text-sm outline-none focus:border-[var(--bronze)]/70 focus:bg-white/15 transition-all"
              />
              <button className="absolute right-2 bg-[var(--bronze)] hover:bg-[var(--bronze-light)] text-[var(--navy)] font-body text-[0.7rem] tracking-[0.15em] uppercase font-bold px-6 py-3 rounded-full transition-colors">
                Search
              </button>
            </div>
          </div>

          <div className="anim-fade-up delay-3 flex flex-wrap justify-center gap-3">
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 text-[var(--cream)] font-body text-xs tracking-[0.08em] pl-4 pr-8 py-2.5 rounded-full outline-none focus:border-[var(--bronze)]/70 cursor-pointer transition-colors hover:bg-white/15"
              >
                {LOCATIONS.map((l) => <option key={l} value={l} className="bg-[var(--navy)] text-[var(--cream)]">{l}</option>)}
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--cream)]/50" width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 3l4 4 4-4" /></svg>
            </div>

            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 text-[var(--cream)] font-body text-xs tracking-[0.08em] pl-4 pr-8 py-2.5 rounded-full outline-none focus:border-[var(--bronze)]/70 cursor-pointer transition-colors hover:bg-white/15"
              >
                {TYPES.map((t) => <option key={t} value={t} className="bg-[var(--navy)] text-[var(--cream)]">{t}</option>)}
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--cream)]/50" width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 3l4 4 4-4" /></svg>
            </div>

            <div className="relative">
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="appearance-none bg-white/10 backdrop-blur-md border border-white/20 text-[var(--cream)] font-body text-xs tracking-[0.08em] pl-4 pr-8 py-2.5 rounded-full outline-none focus:border-[var(--bronze)]/70 cursor-pointer transition-colors hover:bg-white/15"
              >
                {PRICES.map((p) => <option key={p} value={p} className="bg-[var(--navy)] text-[var(--cream)]">{p}</option>)}
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--cream)]/50" width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M1 3l4 4 4-4" /></svg>
            </div>
          </div>

          {/* Quick links to sibling Properties pages */}
          <div className="anim-fade-in delay-6 flex flex-wrap justify-center gap-3 mt-8 pt-8 border-t border-white/10">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.65rem] font-body text-[var(--cream)]/70 hover:text-[var(--cream)] tracking-[0.14em] uppercase border border-white/15 hover:border-[var(--bronze)]/60 px-4 py-2 rounded-full transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-8 font-body text-[var(--cream)]/50 text-xs tracking-[0.15em]">
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
