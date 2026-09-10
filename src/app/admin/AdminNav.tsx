'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';

const items = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/users', label: 'Users', exact: false },
  { href: '/admin/properties', label: 'Properties', exact: false },
  { href: '/admin/articles', label: 'Articles', exact: false },
  { href: '/', label: 'View site', exact: true },
];

export default function AdminNav() {
  const pathname = usePathname();

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
