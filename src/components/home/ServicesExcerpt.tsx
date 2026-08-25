export default function ServicesExcerpt() {
  return (
    <section className="py-24 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto text-center">
        <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4 block">
          Our Expertise
        </span>
        <h2 className="font-display text-4xl md:text-5xl text-[var(--navy)] max-w-2xl mx-auto mb-16">
          Comprehensive Real Estate Services in the Rhine-Main Region
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto">
          {[
            { title: "Buy a Property", desc: "Discover exclusive villas, penthouses, and premium apartments carefully curated to meet your lifestyle." },
            { title: "Sell with Us", desc: "Benefit from our extensive network and discreet, professional marketing to find the right buyer." },
            { title: "Property Valuation", desc: "Get an accurate, market-driven evaluation of your property from our experienced local experts." }
          ].map((service, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--cream)] border border-[var(--bronze)]/30 flex items-center justify-center mb-6 text-[var(--bronze)]">
                {/* Dummy icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-[var(--navy)] mb-3">{service.title}</h3>
              <p className="font-body text-[var(--foreground)]/70 text-sm leading-relaxed max-w-xs">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
