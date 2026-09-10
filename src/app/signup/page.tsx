import AuthShell from '../../components/auth/AuthShell';
import { SignupForm } from '../../components/auth/AuthForms';

export const metadata = {
  title: 'Create Account · Bossert Immobilien',
};

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="Create Account"
      title="Join"
      titleSerif="Bossert."
      text="Create an account to save properties, receive tailored listing updates and reach our advisors directly."
    >
      <SignupForm />
    </AuthShell>
  );
}
