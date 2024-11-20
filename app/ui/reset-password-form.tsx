'use client';
import { lusitana } from '@/app/ui/fonts';
import {
  KeyIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { useState } from 'react';
import Link from 'next/link';
import { resetPassword } from '@/app/actions/password';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [state, dispatch] = useFormState(resetPassword, {});

  // Redirect to login after successful reset
  if (state.success) {
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  }

  const formAction = async (formData: FormData) => {
    formData.append('token', token || '');
    dispatch(formData);
  };

  if (!token) {
    return (
      <div className="rounded-lg bg-gray-900 px-6 pb-4 pt-8">
        <div className="bg-red-900/50 text-red-200 p-4 rounded-md">
          <p>Invalid or missing reset token. Please request a new password reset link.</p>
        </div>
        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-white underline hover:text-gray-300">
            Request new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="w-full">
      <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-white text-2xl`}>
          Reset your password
        </h1>
        <p className="mb-4 text-sm text-gray-400">
          Please enter your new password below. Password must be at least 8 characters
          and include a number and special character.
        </p>
        
        <div className="w-full">
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="password"
            >
              New Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border text-white bg-gray-800 py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-gray-400"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter new password"
                required
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                title="Must contain at least 8 characters, including a number and a special character"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white" />
              <button
                type="button"
                className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-full w-full" />
                ) : (
                  <EyeIcon className="h-full w-full" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border text-white bg-gray-800 py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-gray-400"
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm new password"
                required
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                title="Must contain at least 8 characters, including a number and a special character"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white" />
              <button
                type="button"
                className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-full w-full" />
                ) : (
                  <EyeIcon className="h-full w-full" />
                )}
              </button>
            </div>
          </div>
        </div>

        <ResetButton />

        {state.message && (
          <div className={`mt-4 p-4 rounded-md ${
            state.success ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'
          }`}>
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

        <div className="mt-4 text-center text-xs text-white">
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
    <Button className="mt-6 w-full" aria-disabled={pending}>
      Reset Password <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}