import { SERVICES } from "@/config";

const serviceIcons: Record<string, React.ReactNode> = {
  buy: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
    </svg>
  ),
  sell: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  evaluate: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-2M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7h6" />
    </svg>
  ),
};

export default function ServicesExcerpt() {
  return (
    <section className="py-24 px-6 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto text-center">
        <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4 block reveal">
          Our Expertise
        </span>
        <h2 className="reveal stagger-1 font-display text-4xl md:text-5xl text-[var(--navy)] max-w-2xl mx-auto mb-16">
          Comprehensive Real Estate Services in the Rhine-Main Region
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-5xl mx-auto">
          {SERVICES.map((service, idx) => (
            <div key={idx} className={`reveal stagger-${idx + 1} flex flex-col items-center text-center`}>
              <div className="w-16 h-16 rounded-full bg-[var(--cream)] border border-[var(--bronze)]/30 flex items-center justify-center mb-6 text-[var(--bronze)]">
                {serviceIcons[service.icon]}
              </div>
              <h3 className="font-display text-2xl text-[var(--navy)] mb-3">{service.title}</h3>
              <p className="font-body text-[var(--foreground)]/70 text-sm leading-relaxed max-w-xs">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
