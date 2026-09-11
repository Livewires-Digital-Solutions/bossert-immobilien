"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SiteSettingsMap {
  phone?: { en: string; de: string };
  email?: { en: string; de: string };
  addressLine1?: { en: string; de: string };
  addressLine2?: { en: string; de: string };
  socialInstagram?: { en: string; de: string };
  socialFacebook?: { en: string; de: string };
}

const DEFAULTS = {
  phone: '+49 (0) 69 1234 567',
  phoneHref: 'tel:+49691234567',
  email: 'inquiry@bossert-immo.de',
  addressLine1: 'Opernplatz 14, Suite 200',
  addressLine2: '60313 Frankfurt, Germany',
};

/** Operational contact details — DB-backed when set in /admin/site-settings, else the site defaults. */
export function useSiteSettings() {
  const { lang } = useLanguage();
  const [settings, setSettings] = useState<SiteSettingsMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/site-settings')
      .then((res) => (res.ok ? res.json() : { settings: {} }))
      .then((json) => {
        if (!cancelled) setSettings(json.settings ?? {});
      })
      .catch(() => {
        if (!cancelled) setSettings({});
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const pick = (key: keyof SiteSettingsMap, fallback: string) => {
    const v = settings?.[key];
    if (!v) return fallback;
    return (lang === 'de' ? v.de : v.en) || fallback;
  };

  const phone = pick('phone', DEFAULTS.phone);

  return {
    phone,
    phoneHref: `tel:${phone.replace(/[^+\d]/g, '')}` || DEFAULTS.phoneHref,
    email: pick('email', DEFAULTS.email),
    addressLine1: pick('addressLine1', DEFAULTS.addressLine1),
    addressLine2: pick('addressLine2', DEFAULTS.addressLine2),
    socialInstagram: settings?.socialInstagram ? pick('socialInstagram', '') : '',
    socialFacebook: settings?.socialFacebook ? pick('socialFacebook', '') : '',
  };
}
