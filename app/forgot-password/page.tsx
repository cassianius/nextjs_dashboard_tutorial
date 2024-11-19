import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import ForgotPasswordForm from '../ui/forgot_password_form';

export default function ForgotPasswordPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-gray-900 p-3 md:h-20">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}