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

      {/* Dark gradient overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* ── Hero content ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-between h-full pt-[140px] pb-12 px-6 md:px-16 max-w-[1600px] mx-auto w-full">

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

        {/* Center Title */}
        <div className="flex-1 flex flex-col justify-center my-10 md:my-0">
          <h1 className="anim-fade-up delay-1 flex flex-col items-start text-white leading-[1.1] md:leading-[1.05]">
            <span className="font-body text-2xl md:text-3xl lg:text-[2.35rem] font-light tracking-[0.15em] mb-1 md:mb-2 uppercase text-[rgba(254,252,246,0.9)]">
              {t('titleLine1')}
            </span>
            <span className="font-display text-6xl md:text-[7rem] lg:text-[9.5rem] italic tracking-tight capitalize pr-4 text-white drop-shadow-lg -ml-1 md:-ml-2">
              {t('titleLine2')}
            </span>
            <span className="font-body text-4xl md:text-5xl lg:text-[3.75rem] font-bold tracking-tight mt-1 md:mt-2 text-[var(--cream)]">
              {t('titleLine3')}
            </span>
          </h1>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between w-full">
          <div className="flex flex-col gap-8 md:gap-12">
            <p className="anim-fade-up delay-2 font-body text-[0.65rem] md:text-[0.75rem] text-[rgba(254,252,246,0.8)] whitespace-pre-line tracking-[0.15em] leading-[1.8] uppercase">
              {t('bottomLeftText')}
            </p>

            {/* Scroll indicator */}
            <div className="anim-fade-in delay-3 flex items-center gap-4">
              <svg width="14" height="22" viewBox="0 0 14 22" stroke="rgba(254,252,246,0.6)" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="12" height="20" rx="6" strokeWidth="1.2" />
                <path d="M7 5V9" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] font-body text-[rgba(254,252,246,0.5)] uppercase">
                {t('scroll')}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="anim-fade-in delay-3">
            <Link href="/properties" className="bg-white text-[var(--navy)] flex items-stretch hover:opacity-90 transition-opacity" id="hero-cta-explore">
              <span className="px-6 py-4 text-xs md:text-sm tracking-wider font-semibold uppercase">
                {t('explore')}
              </span>
              <span className="bg-[var(--navy)] text-white px-5 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="12" x2="12" y2="2" />
                  <polyline points="4,2 12,2 12,10" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
