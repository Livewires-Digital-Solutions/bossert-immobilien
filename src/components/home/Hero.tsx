import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="hero-section" aria-label="Hero">

      {/* Background image */}
      <Image
        src="/hero-bg.png"
        alt="Luxury villa at sunset – Bossert Immobilien"
        fill
        priority
        quality={90}
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ── Hero content ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-between h-full pt-[140px] pb-12 px-6 md:px-16 max-w-[1600px] mx-auto w-full">

        {/* Top Group (Since text + Title) */}
        <div className="flex flex-col w-full">
          {/* Top row */}
          <div className="flex justify-between items-start w-full">
            <div className="anim-fade-up flex items-center">
              <span className="text-[0.75rem] tracking-[0.1em] font-body text-[rgba(254,252,246,0.8)]">
                {t('since')}
              </span>
            </div>
            <div className="anim-fade-up hidden md:block text-right">
              <p className="text-[0.75rem] font-body text-[rgba(254,252,246,0.9)] whitespace-pre-line leading-relaxed tracking-[0.02em]">
                {t('topRightText')}
              </p>
            </div>
          </div>

          {/* Center Title and Glass Card */}
          <div className="flex flex-col lg:flex-row items-start justify-between w-full mt-2 md:mt-3">
            <h1 className="anim-fade-up delay-1 flex flex-col items-start text-white leading-[1.1] md:leading-[1.05]">
              <span className="font-body text-2xl md:text-3xl lg:text-[2.2rem] font-medium tracking-[0.1em] mb-1 md:mb-2 uppercase text-white">
                A DIFFERENT
              </span>
              <span className="font-display text-7xl md:text-[8rem] lg:text-[10rem] italic tracking-tight text-white drop-shadow-md -ml-1 md:-ml-2 leading-[0.9]">
                Perspective
              </span>
              <span className="font-body text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tight mt-1 md:mt-4 text-white">
                On Real Estate.
              </span>
            </h1>

            {/* Right: Glass Card */}
            <div className="hidden lg:flex flex-col justify-center bg-[rgba(255,255,255,0.05)] backdrop-blur-sm border border-[rgba(255,255,255,0.15)] rounded-2xl p-8 w-[340px] shadow-2xl anim-fade-up delay-2 mr-8 lg:mt-24">
              <span className="text-white text-[3.5rem] font-body font-medium mb-2 leading-none">500+</span>
              <p className="text-[rgba(254,252,246,0.7)] text-[0.8rem] leading-relaxed font-body tracking-wide">
                Successful innovative projects delivered across the Rhine-Main area from 1991.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between w-full mt-auto">
          <div className="flex flex-col gap-6 md:gap-10">
            <p className="anim-fade-up delay-2 font-body text-[0.65rem] md:text-[0.7rem] text-[rgba(254,252,246,0.6)] whitespace-pre-line tracking-[0.15em] leading-[1.6] uppercase max-w-[280px]">
              {t('bottomLeftText')}
            </p>

            {/* Scroll indicator */}
            <div className="anim-fade-in delay-3 flex flex-col items-start gap-3">
              <span className="text-[0.55rem] md:text-[0.6rem] tracking-[0.2em] font-body text-[rgba(254,252,246,0.5)] uppercase">
                {t('scroll')}
              </span>
              <div className="w-5 h-8 border border-[rgba(254,252,246,0.5)] rounded-full flex justify-center pt-1.5 scroll-arrow">
                <div className="w-1 h-1.5 bg-[rgba(254,252,246,0.5)] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="anim-fade-in delay-3 mb-2">
            <Link href="/properties" className="flex items-stretch bg-white rounded-md overflow-hidden hover:opacity-95 transition-opacity shadow-lg" id="hero-cta-explore">
              <span className="px-6 py-4 text-[0.65rem] md:text-[0.7rem] tracking-[0.15em] font-bold uppercase text-[var(--navy)] flex items-center">
                {t('explore')}
              </span>
              <span className="bg-[var(--navy)] text-white px-5 flex items-center justify-center rounded-r-md border-l border-white/20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M5 19L19 5M19 5H9M19 5V15" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
