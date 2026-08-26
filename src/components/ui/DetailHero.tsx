import Image from "next/image";
import Breadcrumbs, { BreadcrumbItem } from "./Breadcrumbs";

export default function DetailHero({
  image,
  eyebrow,
  title,
  meta,
  breadcrumbs,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  meta?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}) {
  return (
    <section className="relative w-full min-h-[58vh] md:min-h-[64vh] flex items-end overflow-hidden bg-[var(--navy)]">
      <Image
        src={image}
        alt={title}
        fill
        priority
        quality={90}
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pt-28 pb-10 md:pb-14 flex flex-col gap-6">
        {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
        <div className="flex flex-col gap-4">
          {eyebrow && (
            <span className="font-body text-[0.7rem] md:text-[0.75rem] tracking-[0.25em] uppercase italic text-[var(--bronze)]">
              {eyebrow}
            </span>
          )}
          <h1
            className="hero-title"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            {title}
          </h1>
          {meta && <div className="mt-2">{meta}</div>}
        </div>
      </div>
    </section>
  );
}
