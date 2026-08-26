export default function EvaluatePage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Mini Hero */}
      <section className="page-hero px-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-display text-[var(--cream)] mb-4">Evaluate Property</h1>
          <p className="font-body text-[var(--cream)]/70 tracking-[0.2em] uppercase text-xs">
            What is your property worth?
          </p>
        </div>
      </section>

      {/* Evaluation Form */}
      <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white p-8 md:p-16 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            {/* Progress Bar Dummy */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
              <div className="h-full bg-[var(--bronze)] w-1/3"></div>
            </div>

            <div className="mb-12">
              <span className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 font-body mb-2 block">Step 1 of 3</span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--navy)]">Basic Details</h2>
            </div>

            <form className="font-body flex flex-col gap-10">
              <div className="flex flex-col">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-4">Property Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["House", "Apartment", "Land", "Commercial"].map((type, idx) => (
                    <label key={type} className={`border ${idx === 0 ? 'border-[var(--bronze)] bg-[var(--bronze)]/5 text-[var(--navy)]' : 'border-gray-200 text-gray-500 hover:border-gray-300'} p-4 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors`}>
                      <input type="radio" name="propertyType" className="hidden" defaultChecked={idx === 0} />
                      <span className="font-medium text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2">Living Area (sqm)</label>
                  <input type="number" className="border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[var(--bronze)] transition-colors text-sm" placeholder="e.g. 150" />
                </div>
                <div className="flex flex-col">
                  <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2">Plot Size (sqm)</label>
                  <input type="number" className="border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[var(--bronze)] transition-colors text-sm" placeholder="e.g. 500" />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2">Property Address / ZIP Code</label>
                <input type="text" className="border-b border-gray-300 py-2 bg-transparent outline-none focus:border-[var(--bronze)] transition-colors text-sm" placeholder="e.g. 65183 Wiesbaden" />
              </div>

              <div className="mt-8 flex justify-end">
                <button type="button" className="cta-btn !bg-[var(--navy)] !text-[var(--cream)]">
                  Next Step
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
        </div>
      </section>
    </div>
  );
}
