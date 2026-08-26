import { SELLING_PROCESS } from "@/config";

export default function SellPropertyPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Mini Hero */}
      <section className="page-hero px-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-display text-[var(--cream)] mb-4">Sell a Property</h1>
          <p className="font-body text-[var(--cream)]/70 tracking-[0.2em] uppercase text-xs">
            Exclusive Marketing for Premium Real Estate
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4 block">
            Your Property in Best Hands
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--navy)] mb-10">
            Discreet, professional, and highly successful marketing.
          </h2>
          <p className="font-body text-[var(--foreground)]/70 text-lg leading-relaxed">
            Selling a premium property requires more than just an advertisement. It requires a deep understanding of the market, an exclusive network of high-net-worth individuals, and a bespoke marketing strategy. Since 1991, Bossert Immobilien has been the trusted partner for selling luxury real estate in the Rhine-Main region.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 md:px-10 bg-[var(--navy)] text-[var(--cream)]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-20">Our Selling Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {SELLING_PROCESS.map((step, idx) => (
              <div key={idx} className="relative p-8 border border-[var(--cream)]/10 rounded-2xl bg-white/5 backdrop-blur-md">
                <div className="text-[var(--bronze)] font-display text-6xl opacity-30 absolute top-4 right-6 pointer-events-none">
                  {step.num}
                </div>
                <h3 className="font-display text-2xl mb-4 mt-6">{step.title}</h3>
                <p className="font-body text-[var(--cream)]/70 text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 flex justify-center">
            <a href="/evaluate" className="cta-btn !bg-[var(--bronze)] !text-[var(--cream)] !border-none">
              Evaluate Your Property
              <span className="cta-btn-icon !bg-[var(--cream)] !text-[var(--navy)] ml-2" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6" x2="10" y2="6" />
                  <polyline points="6.5,2.5 10,6 6.5,9.5" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
