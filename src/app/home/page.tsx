import Navbar from "@/components/Navbar";
import Hero from "./components/Hero";

export default function HomePage() {
  return (
    <>
      <Navbar />
      {/* 1. Original (EB Garamond) */}
      <div className="relative">
        <div className="absolute top-0 left-0 z-50 bg-black/80 text-white px-4 py-2 text-sm font-sans tracking-widest border border-white/20 mt-24">
          VARIANT 1: EB GARAMOND
        </div>
        <Hero />
      </div>

      {/* 2. Satoshi */}
      <div className="relative">
        <div className="absolute top-0 left-0 z-50 bg-black/80 text-white px-4 py-2 text-sm font-sans tracking-widest border border-white/20">
          VARIANT 2: SATOSHI
        </div>
        <Hero bodyFontOverride="'Satoshi', sans-serif" />
      </div>

      {/* 3. Instrument Serif */}
      <div className="relative">
        <div className="absolute top-0 left-0 z-50 bg-black/80 text-white px-4 py-2 text-sm font-sans tracking-widest border border-white/20">
          VARIANT 3: INSTRUMENT SERIF
        </div>
        <Hero bodyFontOverride="'Instrument Serif', serif" />
      </div>
    </>
  );
}
