import ModalShell from '../../components/auth/ModalShell';
import { ResetPasswordForm } from '../../components/auth/AuthForms';

export const metadata = {
  title: 'Set a New Password · Bossert Immobilien',
};

export default async function ResetPasswordPage(props: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await props.searchParams;

  return (
    <ModalShell standalone>
      <ResetPasswordForm token={token} />
    </ModalShell>
  );
}
