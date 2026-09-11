'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  saveTeamMember,
  deleteTeamMember,
  uploadTeamMemberPhoto,
  type TeamMemberFormValues,
} from '@/app/admin/team-members/actions';
import styles from './ArticleEditor.module.css';

type Props = { initial?: (TeamMemberFormValues & { id: string }) | null };

const EMPTY: TeamMemberFormValues = {
  name: '',
  titleEn: '',
  titleDe: '',
  quoteEn: '',
  quoteDe: '',
  image: '',
  order: 0,
  isActive: true,
};

export default function TeamMemberEditor({ initial }: Props) {
  const router = useRouter();
  const { t } = useLanguage();
  const c = t.admin.common;
  const tf = t.admin.teamMembers.form;
  const editing = Boolean(initial?.id);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [lang, setLang] = useState<'en' | 'de'>('en');
  const [uploading, setUploading] = useState(false);
  const [f, setF] = useState<TeamMemberFormValues>(initial ?? EMPTY);

  const set = <K extends keyof TeamMemberFormValues>(k: K, v: TeamMemberFormValues[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  async function onPhoto(file: File) {
    setUploading(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    const res = await uploadTeamMemberPhoto(fd);
    setUploading(false);
    if (res.ok) set('image', res.url);
    else setError(res.error);
  }

  function submit() {
    setError('');
    startTransition(async () => {
      const res = await saveTeamMember(f);
      if (res.ok) router.push('/admin/team-members');
      else setError(res.error);
    });
  }

  function onDelete() {
    if (!initial?.id) return;
    if (!window.confirm(c.deleteConfirm)) return;
    startTransition(async () => {
      await deleteTeamMember(initial.id);
      router.push('/admin/team-members');
    });
  }

  return (
    <div className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>{tf.name}</span>
          <input className={styles.input} value={f.name} onChange={(e) => set('name', e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{c.order}</span>
          <input className={styles.input} type="number" value={f.order} onChange={(e) => set('order', Number(e.target.value) || 0)} />
        </label>
        <label className={`${styles.field} ${styles.checkField}`}>
          <input type="checkbox" checked={f.isActive} onChange={(e) => set('isActive', e.target.checked)} />
          <span className={styles.label}>{c.active}</span>
        </label>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>{tf.photo}</span>
        <div className={styles.cover}>
          {f.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={f.image} alt="" className={styles.coverPreview} />
          ) : (
            <div className={styles.coverEmpty}>{c.noImage}</div>
          )}
          <div className={styles.coverControls}>
            <input className={styles.input} value={f.image} onChange={(e) => set('image', e.target.value)} placeholder="/uploads/team/…" />
            <label className={styles.uploadBtn}>
              {uploading ? c.uploading : c.upload}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void onPhoto(file);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        </div>
      </div>

      <div className={styles.langTabs}>
        <button type="button" className={`${styles.langTab} ${lang === 'en' ? styles.langActive : ''}`} onClick={() => setLang('en')}>
          {c.english}
        </button>
        <button type="button" className={`${styles.langTab} ${lang === 'de' ? styles.langActive : ''}`} onClick={() => setLang('de')}>
          {c.german}
        </button>
      </div>

      <div hidden={lang !== 'en'}>
        <label className={styles.field}>
          <span className={styles.label}>{tf.titleEn}</span>
          <input className={styles.input} value={f.titleEn} onChange={(e) => set('titleEn', e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{tf.quoteEn}</span>
          <textarea className={styles.textarea} rows={3} value={f.quoteEn} onChange={(e) => set('quoteEn', e.target.value)} />
        </label>
      </div>
      <div hidden={lang !== 'de'}>
        <label className={styles.field}>
          <span className={styles.label}>{tf.titleDe}</span>
          <input className={styles.input} value={f.titleDe} onChange={(e) => set('titleDe', e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{tf.quoteDe}</span>
          <textarea className={styles.textarea} rows={3} value={f.quoteDe} onChange={(e) => set('quoteDe', e.target.value)} />
        </label>
      </div>

      <div className={styles.actions}>
        <button className={styles.save} type="button" onClick={submit} disabled={pending}>
          {pending ? c.saving : editing ? c.save : c.create}
        </button>
        <button className={styles.cancel} type="button" onClick={() => router.push('/admin/team-members')}>
          {c.cancel}
        </button>
        {editing && (
          <button className={styles.delete} type="button" onClick={onDelete} disabled={pending}>
            {c.delete}
          </button>
        )}
      </div>
    </div>
  );
}
