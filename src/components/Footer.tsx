import Link from "next/link";
import { COMPANY } from "@/config";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/for-owners", label: "For Owners" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/references", label: "References" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#02121a] text-[var(--cream)] py-12 md:py-16 px-6 md:px-10 border-t border-[var(--cream)]/10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1 flex flex-col items-start">
          <Link href="/" className="flex flex-col leading-none group mb-6">
            <span className="text-[1.15rem] md:text-[1.3rem] font-bold tracking-[0.22em] text-[#FEFCF6] transition-opacity group-hover:opacity-80 font-display">
              BOSSERT
            </span>
            <span className="text-[0.55rem] tracking-[0.3em] text-[#AF8C53] mt-0.5 font-display">
              REAL ESTATE
            </span>
          </Link>
          <p className="font-body text-sm text-[rgba(254,252,246,0.6)] leading-relaxed max-w-xs">
            Your partner for exclusive real estate in the Rhine-Main region since {COMPANY.since}.
          </p>
        </div>

        {/* Links */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="font-display text-lg mb-4 text-[var(--bronze)]">Navigation</h4>
          <ul className="flex flex-col gap-2 font-body text-sm text-[rgba(254,252,246,0.7)]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--cream)] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-1 md:col-span-1">
          <h4 className="font-display text-lg mb-4 text-[var(--bronze)]">Contact</h4>
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
          <h4 className="font-display text-lg mb-4 text-[var(--bronze)]">Legal</h4>
          <ul className="flex flex-col gap-2 font-body text-sm text-[rgba(254,252,246,0.7)]">
            <li><Link href="/imprint" className="hover:text-[var(--cream)] transition-colors">Imprint</Link></li>
            <li><Link href="/privacy" className="hover:text-[var(--cream)] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[var(--cream)] transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto mt-16 pt-6 border-t border-[var(--cream)]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-body text-[rgba(254,252,246,0.4)]">
        <p>&copy; {currentYear} {COMPANY.name}. All rights reserved.</p>
        <p>
          Developed by{" "}
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
