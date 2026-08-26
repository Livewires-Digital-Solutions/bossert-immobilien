"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import DetailHero from "@/components/ui/DetailHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { TextField, FormSubmitButton } from "@/components/ui/FormField";
import { PROPERTIES } from "@/config";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  useScrollReveal();

  const property = PROPERTIES.find((p) => p.slug === id);
  if (!property) notFound();

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <DetailHero
        image={property.images[0]}
        eyebrow={`${property.type} · ${property.city}`}
        title={property.title}
        meta={
          <div className="flex flex-wrap gap-3 items-center">
            <span
              className={`px-3 py-1 text-[0.62rem] tracking-[0.1em] uppercase font-bold rounded-full border backdrop-blur-md ${
                property.status === "Reserved"
                  ? "bg-amber-400/20 border-amber-300/40 text-amber-100"
                  : "bg-white/20 border-white/30 text-white"
              }`}
            >
              {property.status}
            </span>
            <span className="font-display text-2xl text-[var(--cream)]">{property.price}</span>
          </div>
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Properties", href: "/properties" },
          { label: property.title },
        ]}
      />

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: Details */}
          <div className="lg:col-span-2">
            {/* Key stats bar */}
            <div className="flex flex-wrap gap-6 mb-12 pb-8 border-b border-[var(--navy)]/10">
              {[
                { label: "Size", value: `${property.sqm} sqm` },
                { label: "Rooms", value: `${property.rooms}` },
                { label: "Bathrooms", value: `${property.bathrooms}` },
                { label: "Year Built", value: `${property.yearBuilt}` },
                { label: "Energy Class", value: property.energyClass },
                ...(property.plotSqm ? [{ label: "Plot", value: `${property.plotSqm} sqm` }] : []),
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-[0.6rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-1">{stat.label}</p>
                  <p className="font-display text-xl text-[var(--navy)]">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="reveal mb-12">
              <SectionHeader eyebrow="About This Property" title="Property Overview" className="mb-6" />
              <p className="font-body text-base text-[var(--foreground)]/70 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="reveal mb-12">
              <h3 className="font-display text-2xl text-[var(--navy)] mb-6">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 font-body text-sm text-[var(--foreground)]/70">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--bronze)] shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Gallery */}
            <div className="reveal">
              <h3 className="font-display text-2xl text-[var(--navy)] mb-6">Gallery</h3>
              <div className="grid grid-cols-2 gap-3">
                {property.images.slice(1).map((img, i) => (
                  <div key={i} className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 aspect-[16/7]" : "aspect-[4/3]"}`}>
                    <Image
                      src={img}
                      alt={`${property.title} — image ${i + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 border border-[var(--navy)]/10 rounded-2xl p-8 bg-white shadow-sm">
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-2 block">Listed by</span>
              <h3 className="font-display text-xl text-[var(--navy)] mb-6">{property.agent}</h3>

              <div className="mb-6 pb-6 border-b border-[var(--navy)]/10">
                <p className="font-display text-3xl text-[var(--navy)]">{property.price}</p>
                <p className="font-body text-xs text-[var(--foreground)]/50 tracking-[0.1em] mt-1">{property.status}</p>
              </div>

              <form className="flex flex-col gap-5" id={`property-enquiry-${property.slug}`}>
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body block">Enquire About This Property</span>
                <TextField label="Full Name" name="name" placeholder="Your name" />
                <TextField label="Email" type="email" name="email" placeholder="your@email.de" />
                <TextField label="Phone" type="tel" name="phone" placeholder="+49 …" />
                <TextField label="Message" name="message" rows={4} placeholder="I am interested in this property and would like to arrange a viewing…" />
                <FormSubmitButton label="Send Enquiry" />
              </form>

              <p className="font-body text-xs text-[var(--foreground)]/40 mt-4 text-center leading-relaxed">
                Your enquiry will be handled with complete discretion.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── More Properties ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[1400px] mx-auto text-center">
          <SectionHeader eyebrow="Explore More" title="Similar Properties" align="center" className="mb-10" />
          <Link href="/properties" className="cta-btn !bg-[var(--navy)] !text-[var(--cream)]" id="property-detail-more">
            View All Properties
            <span className="cta-btn-icon !bg-[var(--cream)] !text-[var(--navy)]" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
