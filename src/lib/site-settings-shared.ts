/**
 * Constants/types shared between server code (src/lib/site-settings.ts) and
 * client components (e.g. SiteSettingsForm) — kept free of `server-only` /
 * Prisma imports so it can be bundled into the browser.
 */
export const SITE_SETTINGS_PAGE = 'contact' as const;

export const SITE_SETTINGS_KEYS = [
  'phone',
  'email',
  'addressLine1',
  'addressLine2',
  'socialInstagram',
  'socialFacebook',
] as const;

export type SiteSettingKey = (typeof SITE_SETTINGS_KEYS)[number];

export type SiteSettingsMap = Partial<Record<SiteSettingKey, { en: string; de: string }>>;
