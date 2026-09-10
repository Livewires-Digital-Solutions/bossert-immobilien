import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { requireUser } from '@/lib/require-user';

export const metadata = { title: 'My Account · Bossert Immobilien' };

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  await requireUser('/profile');

  return (
    <main style={{ backgroundColor: '#f0ede8' }}>
      <Navbar invertOnLoad />
      {children}
      <Footer />
    </main>
  );
}
