import Image from "next/image";
import Link from "next/link";

export default function Hero() {
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
      <div className="relative z-10 flex flex-col justify-between h-full pt-[88px] pb-10 px-6 md:px-10 max-w-[1400px] mx-auto w-full">

        {/* Main title area */}
        <div className="relative flex flex-col justify-center flex-1 gap-6 md:gap-8 mt-4 md:mt-6">

          {/* Pre-title line */}
          <div className="anim-fade-up flex items-center gap-4 mb-1 md:mb-2">
            <span
              className="text-[0.65rem] md:text-[0.75rem] tracking-[0.25em] uppercase italic font-body"
              style={{ color: "var(--bronze)" }}
            >
              Since 1991
            </span>
            <span className="w-16 md:w-32 h-[1px]" style={{ backgroundColor: "var(--bronze)", opacity: 0.6 }}></span>
          </div>

          {/* Massive headline — Playfair Display */}
          <div className="anim-fade-up delay-1">
            <h1
              className="hero-title"
              style={{ fontSize: "clamp(3rem, 9.5vw, 8.5rem)" }}
            >
              Elevated
              <br />
              Living Spaces
            </h1>
          </div>

          {/* Tagline — EB Garamond body text */}
          <p
            className="anim-fade-up delay-3 font-body text-[rgba(254,252,246,0.70)] text-base md:text-lg leading-relaxed max-w-[280px] md:max-w-xs tracking-[0.04em]"
          >
            Your partner for exclusive real estate in the Rhine-Main region since 1991.
          </p>

          {/* ── Desktop stat cards — right side ─────────────────────── */}
          <div className="hidden md:flex flex-col gap-2.5 absolute right-10 top-1/2 -translate-y-1/3">

            {/* Stat: Years */}
            <div className="anim-fade-in delay-4 stat-card px-5 py-4 min-w-[170px]">
              <p
                className="text-[0.58rem] tracking-[0.22em] uppercase mb-1 font-body"
                style={{ color: "var(--bronze)" }}
              >
                Years of Experience
              </p>
              <p
                className="text-3xl font-bold leading-none font-display"
                style={{ color: "var(--cream)" }}
              >
                30+
              </p>
            </div>

            {/* Stat: Properties */}
            <div className="anim-fade-in delay-5 stat-card px-5 py-4 min-w-[170px]">
              <p
                className="text-[0.58rem] tracking-[0.22em] uppercase mb-1 font-body"
                style={{ color: "var(--bronze)" }}
              >
                Properties Sold
              </p>
              <p
                className="text-3xl font-bold leading-none font-display"
                style={{ color: "var(--cream)" }}
              >
                500+
              </p>
            </div>

            {/* Stat: Portfolio */}
            <div className="anim-fade-in delay-6 stat-card px-5 py-4 min-w-[170px]">
              <p
                className="text-[0.58rem] tracking-[0.22em] uppercase mb-1 font-body"
                style={{ color: "var(--bronze)" }}
              >
                Portfolio Value
              </p>
              <p
                className="text-3xl font-bold leading-none font-display"
                style={{ color: "var(--cream)" }}
              >
                €2B+
              </p>
            </div>

          </div>
        </div>

        {/* ── Bottom bar: Scroll indicator + CTA ──────────────────────── */}
        <div className="flex items-end justify-between">

          {/* Scroll indicator */}
          <div className="anim-fade-in delay-7 flex flex-col items-start gap-3">
            <span
              className="text-[0.65rem] tracking-[0.22em] uppercase font-body"
              style={{
                color: "rgba(254,252,246,0.45)",
              }}
            >
              Scroll &amp; Discover
            </span>
            <div className="scroll-arrow">
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true">
                <line x1="8" y1="0" x2="8" y2="16" stroke="rgba(254,252,246,0.45)" strokeWidth="1.2" />
                <polyline
                  points="3,11 8,16 13,11"
                  stroke="rgba(254,252,246,0.45)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* CTA Button */}
          <div className="anim-fade-in delay-6">
            <Link href="/property" className="cta-btn" id="hero-cta-explore">
              Explore Properties
              <span className="cta-btn-icon" aria-hidden="true">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="2" y1="6" x2="10" y2="6" />
                  <polyline points="6.5,2.5 10,6 6.5,9.5" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* ── Mobile stat cards ─────────────────────────────────────────── */}
        <div className="flex md:hidden gap-2.5 mt-4 overflow-x-auto pb-1">
          {[
            { label: "Years",      value: "30+"  },
            { label: "Properties", value: "500+" },
            { label: "Portfolio",  value: "€2B+" },
          ].map(({ label, value }) => (
            <div key={label} className="stat-card px-4 py-3 flex-shrink-0 min-w-[110px]">
              <p
                className="text-[0.52rem] tracking-[0.2em] uppercase mb-1 font-body"
                style={{ color: "var(--bronze)" }}
              >
                {label}
              </p>
              <p
                className="text-xl font-bold leading-none font-display text-cream"
              >
                {value}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
