'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import styles from './admin.module.css';

export default function AdminNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const items = [
    { href: '/admin', label: 'Dashboard', exact: true },
    { href: '/admin/users', label: 'Users', exact: false },
    { href: '/admin/properties', label: 'Properties', exact: false },
    { href: '/admin/contact', label: 'Inquiries', exact: false },
    { href: '/admin/articles', label: 'Articles', exact: false },
    { href: '/admin/references', label: t.admin.nav.references, exact: false },
    { href: '/admin/testimonials', label: t.admin.nav.testimonials, exact: false },
    { href: '/admin/team-members', label: t.admin.nav.teamMembers, exact: false },
    { href: '/admin/faqs', label: t.admin.nav.faqs, exact: false },
    { href: '/admin/newsletter', label: t.admin.nav.newsletter, exact: false },
    { href: '/admin/site-settings', label: t.admin.nav.siteSettings, exact: false },
    { href: '/', label: 'View site', exact: true },
  ];

  return (
    <nav className={styles.nav}>
      {items.map((it) => {
        const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`${styles.navItem} ${active ? styles.active : ''}`}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
