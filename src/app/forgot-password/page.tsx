import AuthShell from '../../components/auth/AuthShell';
import { ForgotPasswordForm } from '../../components/auth/AuthForms';

export const metadata = {
  title: 'Reset Password · Bossert Immobilien',
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Account Recovery"
      title="Forgot your"
      titleSerif="password?"
      text="Enter the email address linked to your account and we'll send you a secure link to set a new password."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
