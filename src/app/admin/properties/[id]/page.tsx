import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/require-admin';
import { getAdminProperty } from '@/lib/onoffice-properties';
import PropertyDetailPanel from '@/components/admin/PropertyDetailPanel';
import admin from '../../admin.module.css';

export const metadata = { title: 'Property · Bossert Admin' };

export default async function AdminPropertyDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await props.params;
  const property = await getAdminProperty(id);
  if (!property) notFound();

  return (
    <section>
      <div className={admin.eyebrow}>
        <Link href="/admin/properties" style={{ color: 'inherit' }}>
          Properties
        </Link>{' '}
        / Detail
      </div>
      <h1 className={admin.pageTitle}>{property.title ?? 'Untitled estate'}</h1>
      <PropertyDetailPanel property={property} />
    </section>
  );
}
