import Link from "next/link";

// TODO: replace placeholders with real company info
const COMPANY_NAME = "Bossert Immobilien";
const ADDRESS_LINE_1 = "Musterstraße 1"; // TODO: real address
const ADDRESS_LINE_2 = "12345 Musterstadt, Deutschland"; // TODO: real city/zip
const CONTACT_EMAIL = "info@bossert-immobilien.de"; // TODO: real email
const CONTACT_PHONE = "+49 (0) 000 000 0000"; // TODO: real phone

const NAV_LINKS = [
  { href: "/property", label: "Property" },
  { href: "/owner", label: "Owner" },
  { href: "/interested-party", label: "Interested Party" },
  { href: "/evaluate", label: "Evaluate" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

// TODO: replace with real social URLs and proper SVG icon components
const SOCIAL_LINKS = [
  { href: "#", label: "Facebook", icon: "f" },
  { href: "#", label: "Instagram", icon: "in" },
  { href: "#", label: "LinkedIn", icon: "li" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-foreground/10 bg-background mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Column 1 — Company info */}
        <div className="flex flex-col gap-2">
          {/* TODO: swap for logo image when asset is ready */}
          <p className="text-base font-semibold">{COMPANY_NAME}</p>
          <address className="not-italic font-body text-sm opacity-70 leading-relaxed">
            {ADDRESS_LINE_1}
            <br />
            {ADDRESS_LINE_2}
            <br />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hover:opacity-100 transition-opacity"
            >
              {CONTACT_EMAIL}
            </a>
            <br />
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
              className="hover:opacity-100 transition-opacity"
            >
              {CONTACT_PHONE}
            </a>
          </address>
        </div>

        {/* Column 2 — Nav links */}
        <nav aria-label="Footer navigation">
          <p className="text-sm font-semibold mb-3 uppercase tracking-widest opacity-50">
            Pages
          </p>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3 — Social icons */}
        <div>
          <p className="text-sm font-semibold mb-3 uppercase tracking-widest opacity-50">
            Follow us
          </p>
          {/* TODO: replace letter placeholders with real SVG social icons */}
          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-xs font-semibold opacity-70 hover:opacity-100 hover:border-foreground/60 transition-all"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright */}
      <div className="border-t border-foreground/10">
        <p className="mx-auto max-w-7xl px-6 py-4 text-xs opacity-50 font-body">
          © {currentYear} {COMPANY_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
