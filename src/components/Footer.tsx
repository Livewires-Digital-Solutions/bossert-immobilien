import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/config";
import { useTranslations } from "next-intl";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/properties", key: "properties" },
  { href: "/for-owners", key: "forOwners" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/references", key: "references" },
  { href: "/knowledge", key: "knowledge" },
  { href: "/contact", key: "contact" },
] as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#02121a] text-[var(--cream)] py-12 md:py-16 px-6 md:px-10 border-t border-[var(--cream)]/10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1 flex flex-col items-start">
          <Link href="/" className="flex items-center group mb-6">
            <Image 
              src="/logo.webp" 
              alt="Bossert Immobilien" 
              width={180} 
              height={56} 
              className="opacity-90 group-hover:opacity-100 transition-opacity object-contain h-[48px] md:h-[56px] w-auto"
            />
          </Link>
          <p className="font-body text-sm text-[rgba(254,252,246,0.6)] leading-relaxed max-w-xs">
            {t("brandDescription", { year: COMPANY.since })}
          </p>
        </div>

        {/* Links */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="font-display text-lg mb-4 text-[var(--bronze)]">{t("navigationTitle")}</h4>
          <ul className="flex flex-col gap-2 font-body text-sm text-[rgba(254,252,246,0.7)]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--cream)] transition-colors">
                  {t(`links.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="font-display text-lg mb-4 text-[var(--bronze)]">{t("contactTitle")}</h4>
          <address className="not-italic flex flex-col gap-2 font-body text-sm text-[rgba(254,252,246,0.7)]">
            <p>{COMPANY.name}</p>
            <p>{COMPANY.address.street}</p>
            <p>{COMPANY.address.zip} {COMPANY.address.city}</p>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-[var(--cream)] transition-colors mt-2">
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="hover:text-[var(--cream)] transition-colors">
              {COMPANY.email}
            </a>
          </address>
        </div>

        {/* Legal */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="font-display text-lg mb-4 text-[var(--bronze)]">{t("legalTitle")}</h4>
          <ul className="flex flex-col gap-2 font-body text-sm text-[rgba(254,252,246,0.7)]">
            <li><Link href="/imprint" className="hover:text-[var(--cream)] transition-colors">{t("legalLinks.imprint")}</Link></li>
            <li><Link href="/privacy" className="hover:text-[var(--cream)] transition-colors">{t("legalLinks.privacy")}</Link></li>
            <li><Link href="/terms" className="hover:text-[var(--cream)] transition-colors">{t("legalLinks.terms")}</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto mt-16 pt-6 border-t border-[var(--cream)]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-body text-[rgba(254,252,246,0.4)]">
        <p>&copy; {currentYear} {COMPANY.name}. {t("allRightsReserved")}</p>
        <p>
          {t("developedBy")}{" "}
          <a
            href="https://livewiresdigitalsolutions.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--cream)] transition-colors underline underline-offset-2 decoration-[rgba(254,252,246,0.2)] hover:decoration-[rgba(254,252,246,0.8)]"
          >
            LiveWires Digital Solutions
          </a>
        </p>
      </div>
    </footer>
  );
}
