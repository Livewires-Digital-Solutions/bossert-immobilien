import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="relative z-10">
      <ol className="flex items-center flex-wrap gap-x-2 gap-y-1 font-body text-[0.62rem] md:text-[0.65rem] tracking-[0.14em] uppercase">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {idx > 0 && <span className="text-[var(--cream)]/30">/</span>}
            {item.href ? (
              <Link href={item.href} className="text-[var(--cream)]/55 hover:text-[var(--cream)] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--cream)]/85">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
