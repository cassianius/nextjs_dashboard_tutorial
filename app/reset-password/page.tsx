import AcmeLogo from '@/app/ui/acme-logo';
import ResetPasswordForm from '@/app/ui/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-gray-900 p-3 md:h-20">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <ResetPasswordForm />
      </div>
    </main>
  );
}