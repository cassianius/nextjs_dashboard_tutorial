import AcmeLogo from '@/app/ui/acme-logo';
import SignUpForm from '@/app/ui/signup-form';

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-gray-900 p-3 md:h-20">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}