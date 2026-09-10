'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminPropertyDetail } from '@/lib/onoffice-properties';
import {
  setFieldVisibility,
  setSectionVisibility,
  setAllVisibility,
  setPropertyStatus,
  refreshProperty,
  deleteProperty,
} from '@/app/admin/properties/actions';
import styles from '@/app/admin/properties/properties.module.css';

type Status = AdminPropertyDetail['status'];

export default function PropertyDetailPanel({
  property,
}: {
  property: AdminPropertyDetail;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>(property.status);

  // id -> visible
  const [visible, setVisible] = useState<Record<string, boolean>>(() => {
    const m: Record<string, boolean> = {};
    for (const s of property.sections) for (const f of s.fields) m[f.id] = f.visible;
    return m;
  });

  const allFields = useMemo(
    () => property.sections.flatMap((s) => s.fields),
    [property.sections],
  );
  const totalCount = allFields.length;
  const visibleCount = Object.values(visible).filter(Boolean).length;

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return property.sections;
    return property.sections
      .map((s) => ({
        ...s,
        fields: s.fields.filter(
          (f) =>
            f.label.toLowerCase().includes(q) ||
            f.fieldKey.toLowerCase().includes(q) ||
            (f.value ?? '').toLowerCase().includes(q),
        ),
      }))
      .filter((s) => s.fields.length > 0);
  }, [property.sections, query]);

  function run(fn: () => Promise<{ ok: boolean; error?: string }>, revert: () => void) {
    setError('');
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) {
        revert();
        setError(res.error ?? 'Something went wrong.');
      }
    });
  }

  function toggleField(id: string, next: boolean) {
    setVisible((v) => ({ ...v, [id]: next }));
    run(
      () => setFieldVisibility({ propertyId: property.id, fieldId: id, visible: next }),
      () => setVisible((v) => ({ ...v, [id]: !next })),
    );
  }

  function toggleSection(sectionName: string, next: boolean) {
    const ids = property.sections
      .find((s) => s.name === sectionName)
      ?.fields.map((f) => f.id) ?? [];
    const prev = Object.fromEntries(ids.map((id) => [id, visible[id]]));
    setVisible((v) => {
      const copy = { ...v };
      for (const id of ids) copy[id] = next;
      return copy;
    });
    run(
      () => setSectionVisibility({ propertyId: property.id, section: sectionName, visible: next }),
      () => setVisible((v) => ({ ...v, ...prev })),
    );
  }

  function toggleAll(next: boolean) {
    const prev = { ...visible };
    setVisible(() => {
      const copy: Record<string, boolean> = {};
      for (const id of Object.keys(prev)) copy[id] = next;
      return copy;
    });
    run(
      () => setAllVisibility({ propertyId: property.id, visible: next }),
      () => setVisible(prev),
    );
  }

  function changeStatus(next: Status) {
    const prev = status;
    setStatus(next);
    run(
      () => setPropertyStatus({ id: property.id, status: next }),
      () => setStatus(prev),
    );
  }

  function onRefresh() {
    setError('');
    startTransition(async () => {
      const res = await refreshProperty(property.id);
      if (res.ok) router.refresh();
      else setError(res.error ?? 'Refresh failed.');
    });
  }

  function onDelete() {
    if (!window.confirm('Remove this property from the admin? It can be re-imported later.')) {
      return;
    }
    startTransition(async () => {
      const res = await deleteProperty(property.id);
      if (res.ok) router.push('/admin/properties');
      else setError(res.error ?? 'Delete failed.');
    });
  }

  const meta: [string, string | null][] = [
    ['Internal ID', property.internalId],
    ['External ID', property.externalId],
    ['City', property.city],
    ['Price', property.priceLabel],
    ['Marketing', property.marketingType],
    ['Type', property.objectType],
  ];

  return (
    <div>
      <div className={styles.detailHeader}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <div className={styles.metaGrid}>
            {meta.map(([k, v]) => (
              <div key={k}>
                <div className={styles.metaLabel}>{k}</div>
                <div className={styles.metaValue}>{v || '—'}</div>
              </div>
            ))}
          </div>
        </div>
        {property.heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={property.heroImage} alt="" className={styles.hero} />
        )}
      </div>

      <div className={styles.controlBar}>
        <select
          className={styles.select}
          value={status}
          onChange={(e) => changeStatus(e.target.value as Status)}
          disabled={pending}
          aria-label="Publish status"
        >
          <option value="DRAFT">Draft — hidden from site</option>
          <option value="PUBLISHED">Published — live on site</option>
          <option value="ARCHIVED">Archived</option>
        </select>

        <button className={styles.btnGhost} onClick={onRefresh} disabled={pending}>
          {pending ? 'Working…' : 'Refresh from onOffice'}
        </button>

        <button className={styles.btnDanger} onClick={onDelete} disabled={pending}>
          Delete
        </button>

        <span className={styles.spacer} />

        <button className={styles.linkBtn} onClick={() => toggleAll(true)} disabled={pending}>
          Show all
        </button>
        <button className={styles.linkBtn} onClick={() => toggleAll(false)} disabled={pending}>
          Hide all
        </button>
        <span className={styles.visSummary}>
          {visibleCount} / {totalCount} fields on frontend
        </span>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <input
        className={styles.searchInput}
        placeholder="Filter fields by name, key or value…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {filteredSections.length === 0 ? (
        <div className={styles.emptyState}>No fields match &ldquo;{query}&rdquo;.</div>
      ) : (
        filteredSections.map((section, i) => {
          const shown = section.fields.filter((f) => visible[f.id]).length;
          return (
            <div
              key={section.name}
              className={styles.section}
              style={{ animationDelay: `${Math.min(i * 45, 300)}ms` }}
            >
              <div className={styles.sectionHead}>
                <span className={styles.sectionName}>{section.name}</span>
                <span className={styles.sectionCount}>
                  {shown}/{section.fields.length} shown
                </span>
                <span className={styles.sectionActions}>
                  <button
                    className={styles.linkBtn}
                    onClick={() => toggleSection(section.name, true)}
                    disabled={pending}
                  >
                    All
                  </button>
                  <button
                    className={styles.linkBtn}
                    onClick={() => toggleSection(section.name, false)}
                    disabled={pending}
                  >
                    None
                  </button>
                </span>
              </div>

              {section.fields.map((f) => {
                const on = !!visible[f.id];
                return (
                  <div key={f.id} className={styles.fieldRow}>
                    <div className={styles.fieldText}>
                      <div className={styles.fieldLabel}>
                        {f.label} <span className={styles.fieldKeyTag}>{f.fieldKey}</span>
                      </div>
                      <div className={styles.fieldValue}>{f.value || '—'}</div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={on}
                      aria-label={`Show ${f.label} on the frontend`}
                      className={`${styles.switch} ${on ? styles.switchOn : ''}`}
                      onClick={() => toggleField(f.id, !on)}
                      disabled={pending}
                    />
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}
