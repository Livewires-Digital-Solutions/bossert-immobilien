'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import {
  saveArticle,
  deleteArticle,
  uploadArticleImage,
  type ArticleFormValues,
} from '@/app/admin/articles/actions';
import styles from './ArticleEditor.module.css';

const CATEGORIES = ['Market Reports', 'Architecture', 'Investment', 'Legal'];

type Props = { initial?: (ArticleFormValues & { id: string }) | null };

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

export default function ArticleEditor({ initial }: Props) {
  const router = useRouter();
  const editing = Boolean(initial?.id);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [lang, setLang] = useState<'en' | 'de'>('en');
  const [uploading, setUploading] = useState(false);

  const [f, setF] = useState<ArticleFormValues>(
    initial ?? {
      slug: '',
      category: CATEGORIES[0],
      heroImage: '',
      status: 'DRAFT',
      featured: false,
      date: new Date().toISOString().slice(0, 10),
      titleEn: '',
      titleDe: '',
      descEn: '',
      descDe: '',
      contentEn: '',
      contentDe: '',
    },
  );
  const [slugTouched, setSlugTouched] = useState(editing);

  const set = <K extends keyof ArticleFormValues>(k: K, v: ArticleFormValues[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  const onTitleEn = (v: string) => {
    setF((p) => ({
      ...p,
      titleEn: v,
      slug: slugTouched ? p.slug : slugify(v),
    }));
  };

  async function onCover(file: File) {
    setUploading(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    const res = await uploadArticleImage(fd);
    setUploading(false);
    if (res.ok) set('heroImage', res.url);
    else setError(res.error);
  }

  function submit() {
    setError('');
    startTransition(async () => {
      const res = await saveArticle(f);
      if (res.ok) router.push('/admin/articles');
      else setError(res.error);
    });
  }

  function onDelete() {
    if (!initial?.id) return;
    if (!window.confirm('Delete this article? This cannot be undone.')) return;
    startTransition(async () => {
      await deleteArticle(initial.id);
      router.push('/admin/articles');
    });
  }

  return (
    <div className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>Slug (URL)</span>
          <input
            className={styles.input}
            value={f.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set('slug', e.target.value);
            }}
            placeholder="q3-market-report"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Category</span>
          <input
            className={styles.input}
            list="article-cats"
            value={f.category}
            onChange={(e) => set('category', e.target.value)}
          />
          <datalist id="article-cats">
            {CATEGORIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Publish date</span>
          <input
            className={styles.input}
            type="date"
            value={f.date}
            onChange={(e) => set('date', e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Status</span>
          <select
            className={styles.input}
            value={f.status}
            onChange={(e) => set('status', e.target.value as ArticleFormValues['status'])}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </label>

        <label className={`${styles.field} ${styles.checkField}`}>
          <input
            type="checkbox"
            checked={f.featured}
            onChange={(e) => set('featured', e.target.checked)}
          />
          <span className={styles.label}>Feature on the Knowledge page</span>
        </label>
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Cover image</span>
        <div className={styles.cover}>
          {f.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={f.heroImage} alt="" className={styles.coverPreview} />
          ) : (
            <div className={styles.coverEmpty}>No image</div>
          )}
          <div className={styles.coverControls}>
            <input
              className={styles.input}
              value={f.heroImage}
              onChange={(e) => set('heroImage', e.target.value)}
              placeholder="/uploads/articles/…  or  https://…"
            />
            <label className={styles.uploadBtn}>
              {uploading ? 'Uploading…' : 'Upload'}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void onCover(file);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        </div>
      </div>

      <div className={styles.langTabs}>
        <button
          type="button"
          className={`${styles.langTab} ${lang === 'en' ? styles.langActive : ''}`}
          onClick={() => setLang('en')}
        >
          English
        </button>
        <button
          type="button"
          className={`${styles.langTab} ${lang === 'de' ? styles.langActive : ''}`}
          onClick={() => setLang('de')}
        >
          Deutsch
        </button>
      </div>

      <div hidden={lang !== 'en'}>
        <label className={styles.field}>
          <span className={styles.label}>Title (EN)</span>
          <input className={styles.input} value={f.titleEn} onChange={(e) => onTitleEn(e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Excerpt (EN)</span>
          <textarea
            className={styles.textarea}
            rows={3}
            value={f.descEn}
            onChange={(e) => set('descEn', e.target.value)}
          />
        </label>
        <span className={styles.label}>Body (EN)</span>
        <RichTextEditor value={f.contentEn} onChange={(v) => set('contentEn', v)} />
      </div>

      <div hidden={lang !== 'de'}>
        <label className={styles.field}>
          <span className={styles.label}>Title (DE)</span>
          <input className={styles.input} value={f.titleDe} onChange={(e) => set('titleDe', e.target.value)} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Excerpt (DE)</span>
          <textarea
            className={styles.textarea}
            rows={3}
            value={f.descDe}
            onChange={(e) => set('descDe', e.target.value)}
          />
        </label>
        <span className={styles.label}>Body (DE)</span>
        <RichTextEditor value={f.contentDe} onChange={(v) => set('contentDe', v)} />
      </div>

      <div className={styles.actions}>
        <button className={styles.save} type="button" onClick={submit} disabled={pending}>
          {pending ? 'Saving…' : editing ? 'Save changes' : 'Create article'}
        </button>
        <button className={styles.cancel} type="button" onClick={() => router.push('/admin/articles')}>
          Cancel
        </button>
        {editing && (
          <button className={styles.delete} type="button" onClick={onDelete} disabled={pending}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
