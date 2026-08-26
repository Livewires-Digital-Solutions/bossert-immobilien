import Breadcrumbs, { BreadcrumbItem } from "./Breadcrumbs";

export default function PageHero({
  title,
  subtitle,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
}) {
  return (
    <section className="page-hero px-6">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="relative z-10 text-center flex flex-col items-center gap-5">
        {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-[var(--cream)] mb-4">{title}</h1>
          {subtitle && (
            <p className="font-body text-[var(--cream)]/70 tracking-[0.2em] uppercase text-xs">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
