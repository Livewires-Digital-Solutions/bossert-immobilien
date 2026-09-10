import AuthShell from '../../components/auth/AuthShell';
import { LoginForm } from '../../components/auth/AuthForms';

export const metadata = {
  title: 'Log In · Bossert Immobilien',
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Member Access"
      title="Welcome"
      titleSerif="back."
      text="Sign in to manage your saved properties, track new listings and continue where you left off."
    >
      <LoginForm />
    </AuthShell>
  );
}
