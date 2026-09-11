'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';
import { SITE_SETTINGS_PAGE, SITE_SETTINGS_KEYS, type SiteSettingKey } from '@/lib/site-settings';

const SettingsInput = z.record(z.enum(SITE_SETTINGS_KEYS), z.object({ en: z.string().trim().max(300), de: z.string().trim().max(300) }));

export type SettingsFormValues = z.infer<typeof SettingsInput>;
export type SaveResult = { ok: true } | { ok: false; error: string };

export async function saveSiteSettings(input: SettingsFormValues): Promise<SaveResult> {
  await requireAdmin();
  const parsed = SettingsInput.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }

  try {
    const now = new Date();
    for (const key of SITE_SETTINGS_KEYS as readonly SiteSettingKey[]) {
      const value = parsed.data[key];
      if (!value) continue;
      await prisma.site_settings.upsert({
        where: { page_keyName: { page: SITE_SETTINGS_PAGE, keyName: key } },
        create: { id: createId(), page: SITE_SETTINGS_PAGE, keyName: key, valueEn: value.en, valueDe: value.de || null, updatedAt: now },
        update: { valueEn: value.en, valueDe: value.de || null, updatedAt: now },
      });
    }

    revalidatePath('/');
    revalidatePath('/contact');
    revalidatePath('/admin/site-settings');
    return { ok: true };
  } catch {
    return { ok: false, error: 'Could not save settings.' };
  }
}
