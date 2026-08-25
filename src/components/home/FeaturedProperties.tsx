export default function FeaturedProperties() {
  return (
    <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-3 block">
              Exclusive Portfolio
            </span>
            <h2 className="font-display text-5xl md:text-6xl text-[var(--navy)]">
              Featured Properties
            </h2>
          </div>
          <a href="/property" className="text-sm font-body uppercase tracking-[0.15em] border-b border-[var(--navy)] pb-1 text-[var(--navy)] hover:text-[var(--bronze)] hover:border-[var(--bronze)] transition-colors inline-block w-max">
            View All Properties
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="group cursor-pointer">
              <div className="relative aspect-[4/5] bg-gray-200 overflow-hidden rounded-xl mb-5">
                <div className="absolute inset-0 bg-[var(--navy)]/10 group-hover:bg-transparent transition-colors z-10" />
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-[0.65rem] tracking-[0.1em] text-white uppercase font-bold">
                  For Sale
                </div>
                {/* Dummy placeholder instead of next/image since we don't have images yet */}
                <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 group-hover:scale-105 transition-transform duration-700 ease-out" />
              </div>
              <h3 className="font-display text-2xl text-[var(--navy)] mb-2 group-hover:text-[var(--bronze)] transition-colors">
                Villa Marienhöhe {item}
              </h3>
              <p className="font-body text-[var(--foreground)]/70 text-sm mb-4">
                Wiesbaden, Germany • 450 sqm • 8 Rooms
              </p>
              <p className="font-body text-lg font-medium text-[var(--navy)]">
                € {3 + item}.{item}50.000
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
