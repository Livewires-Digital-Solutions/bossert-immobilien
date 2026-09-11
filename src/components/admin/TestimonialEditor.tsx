'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { saveTestimonial, deleteTestimonial, type TestimonialFormValues } from '@/app/admin/testimonials/actions';
import styles from './ArticleEditor.module.css';

type Props = { initial?: (TestimonialFormValues & { id: string }) | null };

const EMPTY: TestimonialFormValues = {
  quoteEn: '',
  quoteDe: '',
  author: '',
  location: '',
  image: '',
  order: 0,
  isActive: true,
};

export default function TestimonialEditor({ initial }: Props) {
  const router = useRouter();
  const { t } = useLanguage();
  const c = t.admin.common;
  const tf = t.admin.testimonials.form;
  const editing = Boolean(initial?.id);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [lang, setLang] = useState<'en' | 'de'>('en');
  const [f, setF] = useState<TestimonialFormValues>(initial ?? EMPTY);

  const set = <K extends keyof TestimonialFormValues>(k: K, v: TestimonialFormValues[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  function submit() {
    setError('');
    startTransition(async () => {
      const res = await saveTestimonial(f);
      if (res.ok) router.push('/admin/testimonials');
      else setError(res.error);
    });
  }

  function onDelete() {
    if (!initial?.id) return;
    if (!window.confirm(c.deleteConfirm)) return;
    startTransition(async () => {
      await deleteTestimonial(initial.id);
      router.push('/admin/testimonials');
    });
  }

  return (
    <div className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>{tf.author}</span>
          <input className={styles.input} value={f.author} onChange={(e) => set('author', e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{tf.location}</span>
          <input className={styles.input} value={f.location} onChange={(e) => set('location', e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{tf.image}</span>
          <input className={styles.input} value={f.image} onChange={(e) => set('image', e.target.value)} placeholder="/test_bg_villa.jpg" />
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
          <span className={styles.label}>{tf.quoteEn}</span>
          <textarea className={styles.textarea} rows={4} value={f.quoteEn} onChange={(e) => set('quoteEn', e.target.value)} />
        </label>
      </div>
      <div hidden={lang !== 'de'}>
        <label className={styles.field}>
          <span className={styles.label}>{tf.quoteDe}</span>
          <textarea className={styles.textarea} rows={4} value={f.quoteDe} onChange={(e) => set('quoteDe', e.target.value)} />
        </label>
      </div>

      <div className={styles.actions}>
        <button className={styles.save} type="button" onClick={submit} disabled={pending}>
          {pending ? c.saving : editing ? c.save : c.create}
        </button>
        <button className={styles.cancel} type="button" onClick={() => router.push('/admin/testimonials')}>
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
