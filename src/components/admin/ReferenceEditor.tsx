'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  saveReference,
  deleteReference,
  uploadReferenceImage,
  type ReferenceFormValues,
} from '@/app/admin/references/actions';
import styles from './ArticleEditor.module.css';

const TYPES = ['Sale', 'Letting', 'Commercial Sale'];
const SIZES = ['large', 'square', 'tall'];

type Props = { initial?: (ReferenceFormValues & { id: string }) | null };

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

const EMPTY: ReferenceFormValues = {
  slug: '',
  titleEn: '',
  titleDe: '',
  location: '',
  type: TYPES[0],
  heroImage: '',
  size: SIZES[1],
  featured: false,
  order: 0,
  isActive: true,
  descriptionEn: '',
  descriptionDe: '',
  fullDescEn: '',
  fullDescDe: '',
  stats: [],
  features: [],
  images: [],
};

export default function ReferenceEditor({ initial }: Props) {
  const router = useRouter();
  const { t } = useLanguage();
  const c = t.admin.common;
  const tf = t.admin.references.form;
  const editing = Boolean(initial?.id);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [lang, setLang] = useState<'en' | 'de'>('en');
  const [uploading, setUploading] = useState(false);

  const [f, setF] = useState<ReferenceFormValues>(initial ?? EMPTY);
  const [slugTouched, setSlugTouched] = useState(editing);

  const set = <K extends keyof ReferenceFormValues>(k: K, v: ReferenceFormValues[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  const onTitleEn = (v: string) => {
    setF((p) => ({ ...p, titleEn: v, slug: slugTouched ? p.slug : slugify(v) }));
  };

  async function onHeroUpload(file: File) {
    setUploading(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    const res = await uploadReferenceImage(fd);
    setUploading(false);
    if (res.ok) set('heroImage', res.url);
    else setError(res.error);
  }

  async function onGalleryUpload(file: File) {
    setUploading(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    const res = await uploadReferenceImage(fd);
    setUploading(false);
    if (res.ok) set('images', [...f.images, res.url]);
    else setError(res.error);
  }

  function submit() {
    setError('');
    startTransition(async () => {
      const res = await saveReference(f);
      if (res.ok) router.push('/admin/references');
      else setError(res.error);
    });
  }

  function onDelete() {
    if (!initial?.id) return;
    if (!window.confirm(c.deleteConfirm)) return;
    startTransition(async () => {
      await deleteReference(initial.id);
      router.push('/admin/references');
    });
  }

  return (
    <div className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>{tf.slug}</span>
          <input
            className={styles.input}
            value={f.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set('slug', e.target.value);
            }}
            placeholder="historic-villa"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>{tf.location}</span>
          <input className={styles.input} value={f.location} onChange={(e) => set('location', e.target.value)} />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>{tf.type}</span>
          <input
            className={styles.input}
            list="reference-types"
            value={f.type}
            onChange={(e) => set('type', e.target.value)}
          />
          <datalist id="reference-types">
            {TYPES.map((tp) => (
              <option key={tp} value={tp} />
            ))}
          </datalist>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>{tf.size}</span>
          <select className={styles.input} value={f.size} onChange={(e) => set('size', e.target.value)}>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>{c.order}</span>
          <input
            className={styles.input}
            type="number"
            value={f.order}
            onChange={(e) => set('order', Number(e.target.value) || 0)}
          />
        </label>

        <label className={`${styles.field} ${styles.checkField}`}>
          <input type="checkbox" checked={f.featured} onChange={(e) => set('featured', e.target.checked)} />
          <span className={styles.label}>{c.featured}</span>
        </label>

        <label className={`${styles.field} ${styles.checkField}`}>
          <input type="checkbox" checked={f.isActive} onChange={(e) => set('isActive', e.target.checked)} />
          <span className={styles.label}>{c.active}</span>
        </label>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>{tf.heroImage}</span>
        <div className={styles.cover}>
          {f.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={f.heroImage} alt="" className={styles.coverPreview} />
          ) : (
            <div className={styles.coverEmpty}>{c.noImage}</div>
          )}
          <div className={styles.coverControls}>
            <input
              className={styles.input}
              value={f.heroImage}
              onChange={(e) => set('heroImage', e.target.value)}
              placeholder="/uploads/references/…"
            />
            <label className={styles.uploadBtn}>
              {uploading ? c.uploading : c.upload}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void onHeroUpload(file);
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
          <input className={styles.input} value={f.titleEn} onChange={(e) => onTitleEn(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{tf.descriptionEn}</span>
          <textarea className={styles.textarea} rows={3} value={f.descriptionEn} onChange={(e) => set('descriptionEn', e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{tf.fullDescEn}</span>
          <textarea className={styles.textarea} rows={6} value={f.fullDescEn} onChange={(e) => set('fullDescEn', e.target.value)} />
        </label>
      </div>

      <div hidden={lang !== 'de'}>
        <label className={styles.field}>
          <span className={styles.label}>{tf.titleDe}</span>
          <input className={styles.input} value={f.titleDe} onChange={(e) => set('titleDe', e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{tf.descriptionDe}</span>
          <textarea className={styles.textarea} rows={3} value={f.descriptionDe} onChange={(e) => set('descriptionDe', e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{tf.fullDescDe}</span>
          <textarea className={styles.textarea} rows={6} value={f.fullDescDe} onChange={(e) => set('fullDescDe', e.target.value)} />
        </label>
      </div>

      {/* Stats (featured card only) */}
      <div className={styles.field}>
        <span className={styles.label}>{tf.stats}</span>
        {f.stats.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <input
              className={styles.input}
              placeholder={tf.statLabel}
              value={s.label}
              onChange={(e) => {
                const next = [...f.stats];
                next[i] = { ...next[i], label: e.target.value };
                set('stats', next);
              }}
            />
            <input
              className={styles.input}
              placeholder={tf.statValue}
              value={s.value}
              onChange={(e) => {
                const next = [...f.stats];
                next[i] = { ...next[i], value: e.target.value };
                set('stats', next);
              }}
            />
            <button type="button" className={styles.cancel} onClick={() => set('stats', f.stats.filter((_, j) => j !== i))}>
              ×
            </button>
          </div>
        ))}
        <button type="button" className={styles.uploadBtn} onClick={() => set('stats', [...f.stats, { label: '', value: '' }])}>
          {tf.addStat}
        </button>
      </div>

      {/* Features */}
      <div className={styles.field}>
        <span className={styles.label}>{tf.features}</span>
        {f.features.map((feat, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <input
              className={styles.input}
              placeholder={tf.featureEn}
              value={feat.featureEn}
              onChange={(e) => {
                const next = [...f.features];
                next[i] = { ...next[i], featureEn: e.target.value };
                set('features', next);
              }}
            />
            <input
              className={styles.input}
              placeholder={tf.featureDe}
              value={feat.featureDe}
              onChange={(e) => {
                const next = [...f.features];
                next[i] = { ...next[i], featureDe: e.target.value };
                set('features', next);
              }}
            />
            <button type="button" className={styles.cancel} onClick={() => set('features', f.features.filter((_, j) => j !== i))}>
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles.uploadBtn}
          onClick={() => set('features', [...f.features, { featureEn: '', featureDe: '' }])}
        >
          {tf.addFeature}
        </button>
      </div>

      {/* Gallery images */}
      <div className={styles.field}>
        <span className={styles.label}>{tf.images}</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
          {f.images.map((url, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className={styles.coverPreview} style={{ width: 120, height: 90 }} />
              <button
                type="button"
                className={styles.delete}
                style={{ position: 'absolute', top: 2, right: 2, padding: '0.1rem 0.4rem', fontSize: '0.6rem' }}
                onClick={() => set('images', f.images.filter((_, j) => j !== i))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <label className={styles.uploadBtn}>
          {uploading ? c.uploading : tf.addImage}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void onGalleryUpload(file);
              e.target.value = '';
            }}
          />
        </label>
      </div>

      <div className={styles.actions}>
        <button className={styles.save} type="button" onClick={submit} disabled={pending}>
          {pending ? c.saving : editing ? c.save : c.create}
        </button>
        <button className={styles.cancel} type="button" onClick={() => router.push('/admin/references')}>
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
