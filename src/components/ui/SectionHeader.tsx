export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  const titleColor = dark ? "text-[var(--cream)]" : "text-[var(--navy)]";
  const descColor = dark ? "text-[var(--cream)]/70" : "text-[var(--foreground)]/70";

  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrow && (
        <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4 block">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-4xl md:text-5xl ${titleColor}`}>{title}</h2>
      {description && (
        <p className={`font-body text-base leading-relaxed mt-6 ${descColor} ${align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
