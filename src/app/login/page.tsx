import ModalShell from '../../components/auth/ModalShell';
import { LoginForm } from '../../components/auth/AuthForms';

export const metadata = {
  title: 'Log In · Bossert Immobilien',
};

export default function LoginPage() {
  return (
    <ModalShell standalone>
      <LoginForm />
    </ModalShell>
  );
}
