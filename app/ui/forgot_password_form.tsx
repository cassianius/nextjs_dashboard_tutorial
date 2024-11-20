'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { forgotPassword } from '@/app/actions/password';

type ForgotPasswordState = {
  message: string;
  success?: boolean;
} | null;

export default function ForgotPasswordForm() {
  const [state, dispatch] = useFormState(forgotPassword, null);

  return (
    <form action={dispatch}>
      <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-white text-2xl`}>
          Forgot your password?
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Enter your email address below and we'll send you instructions to reset your password.
        </p>
        <div className="w-full">
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
                placeholder="Enter your email address"
                required
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
            </div>
          </div>
        </div>

        <ResetButton />

        {state?.message && (
          <div
            className={`mt-4 p-4 rounded-md ${
              state.success ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'
            }`}
            role="alert"
          >
            <div className="flex items-center space-x-2">
              {state.success ? (
                <CheckCircleIcon className="h-5 w-5" />
              ) : (
                <ExclamationCircleIcon className="h-5 w-5" />
              )}
              <p>{state.message}</p>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-white">
          Remember your password?{' '}
          <Link 
            href="/login" 
            className="text-white underline hover:text-gray-300"
          >
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
    <Button 
      className="mt-8 w-full" 
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? 'Sending...' : 'Send Reset Instructions'}{' '}
      <EnvelopeIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}