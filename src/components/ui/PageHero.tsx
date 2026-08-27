import Image from "next/image";
import Breadcrumbs, { BreadcrumbItem } from "./Breadcrumbs";

export default function PageHero({
  title,
  subtitle,
  breadcrumbs,
  backgroundImage = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
  children,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative w-full min-h-[45vh] md:min-h-[55vh] flex items-end pb-16 md:pb-24 overflow-hidden pt-[8rem] bg-[var(--navy)]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={backgroundImage} 
          alt={title}
          fill 
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Faded Gradient (Navy from left to transparent right) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#042433] via-[#042433]/90 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#042433]/50 via-transparent to-[#042433]/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto anim-fade-up">
        <div className="flex flex-col gap-6 md:gap-8 border-l border-[var(--bronze)]/30 pl-6 md:pl-10">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="mb-2">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          
          <div className="space-y-4 max-w-4xl">
            {subtitle && (
              <p className="font-body text-[var(--bronze)] tracking-[0.3em] uppercase text-xs md:text-sm">
                {subtitle}
              </p>
            )}
            <h1 className="text-5xl sm:text-6xl md:text-[6.5rem] font-display italic text-[var(--cream)] leading-[1.05] tracking-tight pr-4 drop-shadow-xl">
              {title}
            </h1>
          </div>

          {children && (
            <div className="w-full pt-4 md:pt-6">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Decorative vertical line on the right */}
      <div className="absolute bottom-0 right-8 md:right-16 w-[1px] h-32 bg-gradient-to-t from-[var(--bronze)] to-transparent opacity-40 z-10"></div>
    </section>
  );
}
