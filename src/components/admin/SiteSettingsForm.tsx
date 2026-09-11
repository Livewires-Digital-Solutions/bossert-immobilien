'use client';

import React, { useState, useTransition } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { saveSiteSettings, type SettingsFormValues } from '@/app/admin/site-settings/actions';
import { SITE_SETTINGS_KEYS, type SiteSettingKey } from '@/lib/site-settings-shared';
import styles from './ArticleEditor.module.css';
import admin from '@/app/admin/admin.module.css';

type Props = { initial: Record<SiteSettingKey, { en: string; de: string }> };

export default function SiteSettingsForm({ initial }: Props) {
  const { t } = useLanguage();
  const c = t.admin.common;
  const ts = t.admin.siteSettings;
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [f, setF] = useState<SettingsFormValues>(initial);

  const setField = (key: SiteSettingKey, lang: 'en' | 'de', value: string) => {
    setF((p) => ({ ...p, [key]: { ...p[key], [lang]: value } }));
    setSaved(false);
  };

  const labels: Record<SiteSettingKey, string> = {
    phone: ts.phone,
    email: ts.email,
    addressLine1: ts.addressLine1,
    addressLine2: ts.addressLine2,
    socialInstagram: ts.socialInstagram,
    socialFacebook: ts.socialFacebook,
  };

  function submit() {
    setError('');
    startTransition(async () => {
      const res = await saveSiteSettings(f);
      if (res.ok) setSaved(true);
      else setError(res.error);
    });
  }

  return (
    <section>
      <div className={admin.eyebrow}>{ts.eyebrow}</div>
      <h1 className={admin.pageTitle}>{ts.title}</h1>
      <p className={admin.lead}>{ts.lead}</p>

    <div className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}
      {saved && !error && <div className={styles.field} style={{ color: 'var(--bronze)', fontSize: '0.82rem' }}>{ts.saved}</div>}

      {SITE_SETTINGS_KEYS.map((key) => (
        <div key={key} className={styles.grid}>
          <label className={styles.field}>
            <span className={styles.label}>
              {labels[key]} ({c.english})
            </span>
            <input className={styles.input} value={f[key]?.en ?? ''} onChange={(e) => setField(key, 'en', e.target.value)} />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>
              {labels[key]} ({c.german})
            </span>
            <input className={styles.input} value={f[key]?.de ?? ''} onChange={(e) => setField(key, 'de', e.target.value)} />
          </label>
        </div>
      ))}

      <div className={styles.actions}>
        <button className={styles.save} type="button" onClick={submit} disabled={pending}>
          {pending ? c.saving : ts.save}
        </button>
      </div>
    </div>
    </section>
  );
}
