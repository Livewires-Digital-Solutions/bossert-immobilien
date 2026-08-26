"use client";

import Image from "next/image";
import { usePathname, Link, useRouter } from "@/i18n/routing";
import { useState, useEffect, useTransition } from "react";
import { useTranslations, useLocale } from 'next-intl';
import NextLink from "next/link"; // for non-localized links like logo if needed, but we can use the localized Link

const SITE_TAGLINE = "REAL ESTATE";

const NAV_LINKS_KEYS = [
  { href: "/",            key: "home"        },
  { href: "/properties",  key: "properties"  },
  { href: "/for-owners",  key: "forOwners"  },
  { href: "/services",    key: "services"    },
  { href: "/about",       key: "about"       },
  { href: "/references",  key: "references"  },
  { href: "/knowledge",   key: "knowledge"   },
  { href: "/contact",     key: "contact"     },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Navbar');
  const [isPending, startTransition] = useTransition();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <header 
      className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled 
          ? "top-3 left-4 right-4 md:left-10 md:right-10 rounded-full border border-[rgba(254,252,246,0.15)] shadow-[0_12px_40px_rgba(0,0,0,0.3)]" 
          : "top-0 left-0 right-0 border-transparent"
      }`}
      style={{ 
        background: isScrolled ? "rgba(4, 36, 51, 0.70)" : "rgba(4, 36, 51, 0.15)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)"
      }}
      role="banner"
    >
      <div className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10 transition-all duration-500 ${isScrolled ? 'py-3.5 md:py-4' : 'py-5 md:py-6'}`}>

        {/* Logo */}
        <Link
          href="/"
          aria-label="Bossert Immobilien — Home"
          className="flex items-center group"
        >
          <Image 
            src="/logo.webp" 
            alt="Bossert Immobilien" 
            width={180} 
            height={56} 
            className="opacity-90 group-hover:opacity-100 transition-opacity object-contain h-[40px] md:h-[50px] w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS_KEYS.map(({ href, key }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href as any}
                className={`nav-link-hero${isActive ? " active" : ""} font-body`}
                aria-current={isActive ? "page" : undefined}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        {/* Right: Lang Switcher & Mobile Hamburger */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* Language Switcher (Desktop Only) */}
          <div 
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(254,252,246,0.15)] hover:border-[#AF8C53] transition-colors group" 
            style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(254,252,246,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#AF8C53] transition-colors">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <div className={`flex items-center gap-1.5 text-[0.65rem] tracking-[0.15em] font-body ${isPending ? 'opacity-50' : ''}`}>
              <button 
                onClick={() => switchLocale('en')}
                className={`transition-colors cursor-pointer font-bold ${locale === 'en' ? 'text-[#AF8C53]' : 'text-[rgba(254,252,246,0.6)] hover:text-[#FEFCF6]'}`}
              >
                EN
              </button>
              <span className="text-[rgba(254,252,246,0.3)]">/</span>
              <button 
                onClick={() => switchLocale('de')}
                className={`transition-colors cursor-pointer font-bold ${locale === 'de' ? 'text-[#AF8C53]' : 'text-[rgba(254,252,246,0.6)] hover:text-[#FEFCF6]'}`}
              >
                DE
              </button>
            </div>
          </div>

          {/* Hamburger (Mobile Only) */}
          <button
            id="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(254,252,246,0.25)] hover:border-[#AF8C53] transition-colors"
          >
            {menuOpen ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#FEFCF6" strokeWidth="1.8" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            ) : (
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="#FEFCF6" strokeWidth="1.8" strokeLinecap="round">
                <line x1="0" y1="1" x2="16" y2="1" />
                <line x1="0" y1="6" x2="16" y2="6" />
                <line x1="0" y1="11" x2="16" y2="11" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[rgba(254,252,246,0.10)]"
          style={{ background: "rgba(4,36,51,0.96)", backdropFilter: "blur(12px)" }}
        >
          <ul className="flex flex-col px-6 py-6 gap-5">
            {NAV_LINKS_KEYS.map(({ href, key }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href as any}
                    onClick={() => setMenuOpen(false)}
                    className={`nav-link-hero text-base${isActive ? " active" : ""} font-body`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2 border-t border-[rgba(254,252,246,0.1)]">
              <div className="flex items-center gap-3 mb-4">
                 <button 
                  onClick={() => switchLocale('en')}
                  className={`text-xs font-bold ${locale === 'en' ? 'text-[#AF8C53]' : 'text-[rgba(254,252,246,0.6)]'}`}
                >
                  EN
                </button>
                <span className="text-[rgba(254,252,246,0.3)] text-xs">/</span>
                <button 
                  onClick={() => switchLocale('de')}
                  className={`text-xs font-bold ${locale === 'de' ? 'text-[#AF8C53]' : 'text-[rgba(254,252,246,0.6)]'}`}
                >
                  DE
                </button>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
