export default function BuyPropertyPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Mini Hero */}
      <section className="page-hero px-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-display text-[var(--cream)] mb-4">Buy a Property</h1>
          <p className="font-body text-[var(--cream)]/70 tracking-[0.2em] uppercase text-xs">
            Find your dream home with us
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4 block">
            Exclusive Service
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[var(--navy)] mb-10">
            A bespoke approach to finding the perfect property in the Rhine-Main region.
          </h2>
          <p className="font-body text-[var(--foreground)]/70 text-lg leading-relaxed mb-12">
            Whether you are looking for a luxury villa in Wiesbaden, an elegant penthouse in Frankfurt, or a historic estate in the surrounding countryside, our extensive network and off-market portfolio ensure we find exactly what you desire. Register your search profile with us for exclusive access to properties before they are publicly listed.
          </p>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-display text-3xl text-[var(--navy)] mb-2">Search Profile</h3>
          <p className="font-body text-sm text-[var(--foreground)]/60 mb-10">
            Tell us what you are looking for. Our experts will contact you with suitable offers.
          </p>

          <form className="font-body flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dummy Input Group */}
              <div className="flex flex-col">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2">First Name</label>
                <input type="text" className="border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[var(--bronze)] transition-colors text-sm" placeholder="John" />
              </div>
              <div className="flex flex-col">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2">Last Name</label>
                <input type="text" className="border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[var(--bronze)] transition-colors text-sm" placeholder="Doe" />
              </div>
              <div className="flex flex-col">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2">Email Address</label>
                <input type="email" className="border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[var(--bronze)] transition-colors text-sm" placeholder="john@example.com" />
              </div>
              <div className="flex flex-col">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2">Phone Number</label>
                <input type="tel" className="border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[var(--bronze)] transition-colors text-sm" placeholder="+49 ..." />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2">Preferred Location</label>
              <input type="text" className="border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[var(--bronze)] transition-colors text-sm" placeholder="e.g. Wiesbaden, Frankfurt, Taunus" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2">Max Price (€)</label>
                <select className="border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[var(--bronze)] transition-colors text-sm text-gray-600">
                  <option>Up to €1,000,000</option>
                  <option>Up to €2,000,000</option>
                  <option>Up to €5,000,000</option>
                  <option>Over €5,000,000</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2">Property Type</label>
                <select className="border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[var(--bronze)] transition-colors text-sm text-gray-600">
                  <option>Villa / House</option>
                  <option>Apartment / Penthouse</option>
                  <option>Investment Property</option>
                  <option>Land</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2">Additional Requirements</label>
              <textarea rows={3} className="border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[var(--bronze)] transition-colors text-sm resize-none" placeholder="Pool, large garden, specific architecture..."></textarea>
            </div>

            <div className="mt-4">
              <button type="button" className="cta-btn !bg-[var(--navy)] !text-[var(--cream)] w-full justify-center">
                Submit Search Profile
                <span className="cta-btn-icon !bg-[var(--cream)] !text-[var(--navy)] ml-2" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="6" x2="10" y2="6" />
                    <polyline points="6.5,2.5 10,6 6.5,9.5" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
