import Image from "next/image";
import { Link } from "@/i18n/routing";

const CARDS = [
  {
    num: "01",
    tag: "FIND",
    title: "Discover",
    subtitle: "Properties worth knowing about",
    link: "EXPLORE PROPERTIES ⟶",
    href: "/properties",
  },
  {
    num: "02",
    tag: "FOR OWNERS",
    title: "Sell",
    subtitle: "A strategy built around your property",
    link: "SELL YOUR PROPERTY ⟶",
    href: "/for-owners",
  },
  {
    num: "03",
    tag: "VALUATION",
    title: "Value",
    subtitle: "Know the value before you make the move",
    link: "REQUEST A VALUATION ⟶",
    href: "/services",
  },
  {
    num: "04",
    tag: "ADVISORY",
    title: "Advise",
    subtitle: "A local perspective you can rely on",
    link: "DISCOVER OUR APPROACH ⟶",
    href: "/about",
  }
];

export default function WhatWeDo() {
  return (
    <section className="w-full bg-[#FEFCF6] text-[var(--navy)] py-20 md:py-32 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-16 xl:gap-10 items-stretch">
        
        {/* Left Content */}
        <div className="flex-[1.2] flex flex-col justify-between pr-4 lg:pr-10">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#AF8C53]"></div>
            <span className="text-[0.6rem] tracking-[0.2em] font-semibold text-[#AF8C53] uppercase">What We Do</span>
          </div>
          
          <h2 className="flex flex-col items-start leading-[1.05]">
            <span className="font-body text-xl md:text-[1.7rem] font-light tracking-[0.05em] uppercase text-[var(--navy)] mb-1">
              A MORE CONSIDERED WAY
            </span>
            <span className="font-display text-[5.5rem] md:text-[6rem] italic tracking-tight text-[var(--navy)] -ml-1">
              to navigate
            </span>
            <span className="font-body text-4xl md:text-5xl font-bold tracking-tight text-[var(--navy)] mt-2">
              real estate.
            </span>
          </h2>
          
          <p className="text-[0.8rem] md:text-[0.9rem] leading-[1.8] text-[var(--navy)] opacity-80 max-w-[400px]">
            From finding the right property to understanding its value, Bossert brings together local expertise, personal advice and a complete range of real estate services — from the first conversation to the final handover.
          </p>

          <div className="pt-8 border-t border-[rgba(4,36,51,0.1)] w-full max-w-[400px]">
            <span className="text-[0.6rem] font-semibold tracking-wide opacity-60">
              Rhein-Main Region · Since 1991
            </span>
          </div>
        </div>

        {/* Right Cards (Accordion) */}
        <div className="flex-[1.6] flex flex-col lg:flex-row gap-2 lg:gap-3 h-[600px] lg:h-[550px] w-full max-w-[1050px] ml-auto">
          {CARDS.map((card, idx) => (
            <div 
              key={idx} 
              className="relative group min-w-0 rounded-xl overflow-hidden cursor-pointer flex flex-col justify-between p-6 shadow-lg flex-1 hover:flex-[1.6] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            >
              {/* Background Image Placeholder */}
              <div className="absolute inset-0 bg-[#0A1A24] z-0">
                <Image 
                  src="/hero-bg.png" 
                  alt={card.title}
                  fill
                  className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              
              {/* Dark Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[rgba(4,36,51,0.2)] to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Top info */}
              <div className="relative z-20 flex justify-between items-center text-white/50 text-[0.6rem] tracking-widest uppercase font-semibold">
                <span>{card.num}</span>
                <span className="transition-opacity duration-500">{card.tag}</span>
              </div>

              {/* Big decorative number */}
              <span className="font-display italic text-[7rem] md:text-[8rem] leading-none text-white/[0.07] absolute bottom-32 right-2 pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:-translate-x-4 z-10">
                {card.num}
              </span>

              {/* Bottom info */}
              <div className="relative z-20 flex flex-col transform transition-transform duration-500 group-hover:-translate-y-2 mt-auto">
                <h3 className="text-3xl font-body font-medium text-white mb-2">{card.title}</h3>
                <p className="font-display italic text-white/80 text-[0.95rem] mb-6 max-w-[200px]">{card.subtitle}</p>
                
                <Link href={card.href as any} className="text-[0.55rem] tracking-[0.2em] font-bold uppercase text-white/60 group-hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap">
                  {card.link}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
