export default function CallToAction() {
  return (
    <section className="relative py-32 px-6 md:px-10 bg-[var(--navy)] overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        <h2 className="reveal font-display text-5xl md:text-6xl text-[var(--cream)] mb-6">
          Ready to find your dream home?
        </h2>
        <p className="reveal stagger-1 font-body text-[var(--cream)]/70 text-lg mb-10 max-w-xl">
          Contact our team of experts today. We are here to guide you through every step of your real estate journey.
        </p>
        <button className="cta-btn !bg-transparent border border-[var(--bronze)] !text-[var(--cream)] hover:!bg-[var(--bronze)]">
          Contact Us
          <span className="cta-btn-icon !bg-[var(--cream)] !text-[var(--navy)]" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="6" x2="10" y2="6" />
              <polyline points="6.5,2.5 10,6 6.5,9.5" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
}
