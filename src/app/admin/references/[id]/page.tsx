import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/require-admin';
import { getReferenceById, parseStats } from '@/lib/references';
import ReferenceEditor from '@/components/admin/ReferenceEditor';
import type { ReferenceFormValues } from '../actions';
import admin from '../../admin.module.css';

export const metadata = { title: 'Edit reference · Bossert Admin' };

export default async function EditReferencePage(props: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await props.params;
  const r = await getReferenceById(id);
  if (!r) notFound();

  const initial: ReferenceFormValues & { id: string } = {
    id: r.id,
    slug: r.slug,
    titleEn: r.titleEn,
    titleDe: r.titleDe ?? '',
    location: r.location,
    type: r.type,
    heroImage: r.heroImage ?? '',
    size: r.size ?? 'square',
    featured: r.featured,
    order: r.order,
    isActive: r.isActive,
    descriptionEn: r.descriptionEn,
    descriptionDe: r.descriptionDe ?? '',
    fullDescEn: r.fullDescEn ?? '',
    fullDescDe: r.fullDescDe ?? '',
    stats: parseStats(r.statsJson),
    features: r.reference_features.map((f) => ({ featureEn: f.featureEn, featureDe: f.featureDe ?? '' })),
    images: r.reference_images.map((img) => img.url),
  };

  return (
    <section>
      <div className={admin.eyebrow}>
        <Link href="/admin/references" style={{ color: 'inherit' }}>
          References
        </Link>{' '}
        / Edit
      </div>
      <h1 className={admin.pageTitle}>{r.titleEn}</h1>
      <ReferenceEditor initial={initial} />
    </section>
  );
}
