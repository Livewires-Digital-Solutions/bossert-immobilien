import AuthShell from '../../components/auth/AuthShell';
import { ResetPasswordForm } from '../../components/auth/AuthForms';

export const metadata = {
  title: 'Set a New Password · Bossert Immobilien',
};

export default async function ResetPasswordPage(props: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await props.searchParams;

  return (
    <AuthShell
      eyebrow="Account Recovery"
      title="Set a new"
      titleSerif="password."
      text="Choose a strong password you don't use elsewhere. This link can only be used once."
    >
      <ResetPasswordForm token={token} />
    </AuthShell>
  );
}
