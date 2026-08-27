import Image from "next/image";
import Breadcrumbs, { BreadcrumbItem } from "./Breadcrumbs";
import PageContainer from "./PageContainer";

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
        className="object-cover object-center scale-[1.03] animate-[imageScaleIn_1.5s_var(--ease-out-expo)_forwards]"
        sizes="100vw"
      />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="relative z-10 w-full pt-28 pb-10 md:pb-14">
        <PageContainer>
          <div className="flex flex-col gap-6">
            {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
            <div className="space-y-6 max-w-4xl">
              {eyebrow && (
                <p className="font-body text-[var(--bronze)] tracking-[0.3em] uppercase text-xs md:text-sm anim-fade-up delay-1">
                  {eyebrow}
                </p>
              )}
              <h1 className="text-4xl sm:text-5xl md:text-[5.5rem] font-display italic text-[var(--cream)] leading-[1.05] tracking-tight pr-4 drop-shadow-xl anim-fade-up delay-2">
                {title}
              </h1>
            </div>
            {meta && <div className="mt-2">{meta}</div>}
          </div>
        </PageContainer>
      </div>
    </section>
  );
}
