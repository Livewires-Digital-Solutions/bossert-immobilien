import Image from "next/image";
import { TEAM_MEMBERS } from "@/config";

export default function ServicesPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Mini Hero */}
      <section className="page-hero px-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-display text-[var(--cream)] mb-4">About Us</h1>
          <p className="font-body text-[var(--cream)]/70 tracking-[0.2em] uppercase text-xs">
            Excellence in Real Estate Since 1991
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4 block">
              Our Heritage
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--navy)] mb-8">
              Decades of trust, discretion, and market expertise.
            </h2>
            <p className="font-body text-[var(--foreground)]/70 text-base leading-relaxed mb-6">
              Founded in 1991, Bossert Immobilien has established itself as one of the most prestigious real estate agencies in the Rhine-Main region. We specialize in the brokerage of high-end residential and commercial properties.
            </p>
            <p className="font-body text-[var(--foreground)]/70 text-base leading-relaxed">
              Our philosophy is simple: We treat every property as if it were our own, and every client like family. This uncompromising commitment to quality and service has allowed us to build a vast network of satisfied clients and premium off-market properties.
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="Bossert Immobilien Office"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl text-[var(--navy)]">Our Leadership</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group cursor-pointer">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-transparent group-hover:border-[var(--bronze)] transition-colors duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
                <h3 className="font-display text-2xl text-[var(--navy)] mb-1">{member.name}</h3>
                <p className="font-body text-[var(--bronze)] text-sm tracking-[0.1em] uppercase">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
