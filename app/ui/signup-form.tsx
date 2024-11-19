'use client';

import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signUp } from '@/app/actions/user';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import { Button } from './button';
import Link from 'next/link';

const initialState = {
  message: null,
  errors: undefined,
  success: false,
};

export default function SignUpForm() {
  const router = useRouter();
  const [state, dispatch] = useFormState(signUp, initialState);

  useEffect(() => {
    if (state?.success) {
      // Store IDs if needed for the next step
      sessionStorage.setItem('temp_user_id', state.userId!);
      sessionStorage.setItem('temp_account_id', state.accountId!);
      router.push('/signup/company-profile');
    }
  }, [state, router]);

  return (
    <form action={dispatch}>
      <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-white text-2xl`}>
          Create your account
        </h1>

        {/* Form error messages */}
        {state?.errors?._form && (
          <div className="rounded-md bg-red-500 p-3 mb-4">
            {state.errors._form.map((error) => (
              <p key={error} className="text-sm text-white">
                {error}
              </p>
            ))}
          </div>
        )}

        <div className="w-full">
          {/* First Name Field */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="firstName"
            >
              First Name
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                  state?.errors?.firstName ? 'border-red-500' : 'border-gray-600'
                }`}
                id="firstName"
                type="text"
                name="firstName"
                placeholder="First Name"
                required
              />
              <UserIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
            </div>
            {state?.errors?.firstName && (
              <div className="mt-1 text-xs text-red-500">
                {state.errors.firstName.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Last Name Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                  state?.errors?.lastName ? 'border-red-500' : 'border-gray-600'
                }`}
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
              />
              <UserIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
            </div>
            {state?.errors?.lastName && (
              <div className="mt-1 text-xs text-red-500">
                {state.errors.lastName.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                  state?.errors?.email ? 'border-red-500' : 'border-gray-600'
                }`}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
            </div>
            {state?.errors?.email && (
              <div className="mt-1 text-xs text-red-500">
                {state.errors.email.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="password"
            >
              Create Password
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                  state?.errors?.password ? 'border-red-500' : 'border-gray-600'
                }`}
                id="password"
                type="password"
                name="password"
                placeholder="Create password"
                required
                minLength={8}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white" />
            </div>
            {state?.errors?.password && (
              <div className="mt-1 text-xs text-red-500">
                {state.errors.password.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
            <p className="mt-2 text-xs text-gray-400">
              Password must be at least 8 characters long and include a mix of letters, numbers, and special characters.
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                  state?.errors?.confirmPassword ? 'border-red-500' : 'border-gray-600'
                }`}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                minLength={8}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white" />
            </div>
            {state?.errors?.confirmPassword && (
              <div className="mt-1 text-xs text-red-500">
                {state.errors.confirmPassword.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="mt-6 flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className={`h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900 ${
                  state?.errors?.terms ? 'border-red-500' : 'border-gray-600'
                }`}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="terms" className="text-xs text-gray-300">
                By signing up, I agree to the{' '}
                <Link href="/terms" className="text-white underline hover:text-gray-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-white underline hover:text-gray-300">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </div>
          {state?.errors?.terms && (
            <div className="mt-1 text-xs text-red-500">
              {state.errors.terms.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <Button className="mt-6 w-full">
            Sign Up <RocketLaunchIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>

          {/* Login Link */}
          <div className="mt-4 text-center text-xs text-white">
            Already have an account?{' '}
            <Link href="/login" className="text-white underline hover:text-gray-300">
              Log in
            </Link>
          </div>

          {/* Success Message */}
          {state?.message && (
            <p className="mt-4 text-sm text-green-500">{state.message}</p>
          )}
        </div>
      </div>
    </form>
  );
}