import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ResetPasswordForm } from '../../components/auth/AuthForms';
import styles from '../../components/auth/AuthForm.module.css';

export const metadata = {
  title: 'Set a New Password · Bossert Immobilien',
};

export default async function ResetPasswordPage(props: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await props.searchParams;

  return (
    <main style={{ backgroundColor: 'var(--navy)' }}>
      <Navbar />
      <div className={styles.standaloneContainer}>
        <div className={styles.standaloneCard}>
          <ResetPasswordForm token={token} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
