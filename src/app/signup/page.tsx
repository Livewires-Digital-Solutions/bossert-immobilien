import ModalShell from '../../components/auth/ModalShell';
import { SignupForm } from '../../components/auth/AuthForms';

export const metadata = {
  title: 'Create Account · Bossert Immobilien',
};

export default function SignupPage() {
  return (
    <ModalShell standalone>
      <SignupForm />
    </ModalShell>
  );
}
