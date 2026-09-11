import 'server-only';
import { prisma } from '@/lib/prisma';
import type { site_settings as SiteSetting } from '@prisma/client';
import { SITE_SETTINGS_PAGE, SITE_SETTINGS_KEYS, type SiteSettingKey, type SiteSettingsMap } from '@/lib/site-settings-shared';

export type { SiteSetting };
export { SITE_SETTINGS_PAGE, SITE_SETTINGS_KEYS };
export type { SiteSettingKey, SiteSettingsMap };

/**
 * The `site_settings` table is a generic (page, keyName) -> value store. We only
 * manage the genuinely operational values here — everything else stays static
 * copy in src/locales/{en,de}.ts.
 */

/** Public: key -> {en, de} map for the settings above (missing keys are simply absent). */
export async function getSiteSettings(): Promise<SiteSettingsMap> {
  const rows = await prisma.site_settings.findMany({
    where: { page: SITE_SETTINGS_PAGE },
  });
  const map: SiteSettingsMap = {};
  for (const row of rows) {
    if ((SITE_SETTINGS_KEYS as readonly string[]).includes(row.keyName)) {
      map[row.keyName as SiteSettingKey] = { en: row.valueEn, de: row.valueDe || row.valueEn };
    }
  }
  return map;
}

/** Admin: same map, but always includes every known key (empty string if unset), for the settings form. */
export async function getSiteSettingsForAdmin(): Promise<Record<SiteSettingKey, { en: string; de: string }>> {
  const map = await getSiteSettings();
  const full = {} as Record<SiteSettingKey, { en: string; de: string }>;
  for (const key of SITE_SETTINGS_KEYS) {
    full[key] = map[key] ?? { en: '', de: '' };
  }
  return full;
}
