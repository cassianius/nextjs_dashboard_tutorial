'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';

type ForgotPasswordState = {
  message: string;
  success?: boolean;
} | null;

const initState: ForgotPasswordState = null;

// Simplified dummy action
const forgotPassword = async (prevState: ForgotPasswordState, formData: FormData): Promise<ForgotPasswordState> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    message: 'If an account exists for this email, you will receive password reset instructions shortly.',
    success: true,
  };
};

export default function ForgotPasswordForm() {
  const [state, dispatch] = useFormState(forgotPassword, initState);

  return (
    <form action={dispatch}>
      <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-white text-2xl`}>
          Reset your password
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Enter your email address below and we'll send you instructions to reset your password.
        </p>
        <div className="w-full">
          {/* Email Field */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
            </div>
          </div>
        </div>

        <ResetButton />

        {state?.message && (
          <div className={`mt-4 p-4 rounded-md ${state.success ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'} text-sm`}>
            <p>{state.message}</p>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-white">
          Remember your password?{' '}
          <Link href="/login" className="text-white underline hover:text-gray-300">
            Log in
          </Link>
        </div>
      </div>
    </form>
  );
}

function ResetButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-8 w-full" aria-disabled={pending}>
      Send Reset Instructions <EnvelopeIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}