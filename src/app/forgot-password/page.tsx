import ModalShell from '../../components/auth/ModalShell';
import { ForgotPasswordForm } from '../../components/auth/AuthForms';

export const metadata = {
  title: 'Reset Password · Bossert Immobilien',
};

export default function ForgotPasswordPage() {
  return (
    <ModalShell standalone>
      <ForgotPasswordForm />
    </ModalShell>
  );
}
