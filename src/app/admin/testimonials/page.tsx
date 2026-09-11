import { requireAdmin } from '@/lib/require-admin';
import { getAllTestimonials } from '@/lib/testimonials';
import TestimonialsAdminList from '@/components/admin/TestimonialsAdminList';

export const metadata = { title: 'Testimonials · Bossert Admin' };

export default async function AdminTestimonialsPage() {
  await requireAdmin();
  const testimonials = await getAllTestimonials();
  return <TestimonialsAdminList testimonials={testimonials} />;
}
