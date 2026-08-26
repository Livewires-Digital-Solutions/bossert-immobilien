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
      <div className="relative z-10 flex flex-col justify-between h-full pt-[120px] pb-10 px-6 md:px-12 max-w-[1600px] mx-auto w-full">

        {/* Top row */}
        <div className="flex justify-between items-start w-full">
          <div className="anim-fade-up flex items-center">
            <span className="text-[0.7rem] md:text-[0.8rem] tracking-widest font-body text-gray-300">
              {t('since')}
            </span>
          </div>
          <div className="anim-fade-up hidden md:block text-right">
            <p className="text-[0.65rem] md:text-[0.75rem] font-body text-gray-300 whitespace-pre-line leading-relaxed tracking-wide">
              {t('topRightText')}
            </p>
          </div>
        </div>

        {/* Center Title */}
        <div className="flex-1 flex flex-col justify-center my-10 md:my-0">
          <h1 className="anim-fade-up delay-1 flex flex-col items-start text-white leading-[1.1] md:leading-[1.05]">
            <span className="font-body text-[clamp(1rem,2.5vw,2rem)] font-light tracking-wide md:tracking-[0.1em] mb-1 md:mb-2 uppercase">
              {t('titleLine1')}
            </span>
            <span className="font-display text-[clamp(4rem,10vw,9rem)] italic tracking-tight capitalize pr-4 text-white drop-shadow-md">
              {t('titleLine2')}
            </span>
            <span className="font-body text-[clamp(1.5rem,3.5vw,3rem)] font-bold tracking-tight mt-2 md:mt-4">
              {t('titleLine3')}
            </span>
          </h1>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between w-full">
          <div className="flex flex-col gap-6 md:gap-10">
            <p className="anim-fade-up delay-2 font-body text-[0.6rem] md:text-[0.7rem] text-gray-300 whitespace-pre-line tracking-widest leading-loose">
              {t('bottomLeftText')}
            </p>

            {/* Scroll indicator */}
            <div className="anim-fade-in delay-3 flex items-center gap-3">
              <svg width="14" height="22" viewBox="0 0 14 22" className="stroke-gray-400" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="12" height="20" rx="6" strokeWidth="1.5" />
                <path d="M7 5V9" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-[0.6rem] tracking-[0.2em] font-body text-gray-400">
                {t('scroll')}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="anim-fade-in delay-3">
            <Link href="/properties" className="bg-white text-[var(--navy)] flex items-stretch hover:opacity-90 transition-opacity" id="hero-cta-explore">
              <span className="px-6 py-4 text-xs tracking-wider font-semibold">
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
