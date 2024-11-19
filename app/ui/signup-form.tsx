'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type SignUpState = {
  error?: string;
} | undefined;

// Temporary simplified version that just allows navigation
const signUp = async () => {
  return { error: undefined };
};

export default function SignUpForm() {
  const [state, action] = useFormState(signUp, undefined);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (formData: FormData) => {
    // const result = await action(formData);
    // if (!result?.error) {
    router.push('signup/companyProfile');
    // }
  };

  return (
    <form action={handleSubmit}>
      <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-white text-2xl`}>
          Create your account
        </h1>
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
                className="peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="firstName"
                type="text"
                name="firstName"
                placeholder="First Name"
                required
              />
              <UserIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
            </div>
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
                className="peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
              />
              <UserIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
            </div>
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
                className="peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="password"
                type="password"
                name="password"
                placeholder="Create password"
                required
                minLength={8}
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white" />
            </div>
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
                className="peer block w-full rounded-md text-white border bg-gray-800 py-[9px] mb-12 pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                minLength={8}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white" />
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
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
        <SignUpButton />
        <div className="mt-4 text-center text-xs text-white">
          Already have an account?{' '}
          <Link href="/login" className="text-white underline hover:text-gray-300">
            Log in
          </Link>
        </div>
        <div className="flex h-8 items-end space-x-1">
          {state?.error && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                {state.error}
              </p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Sign Up <RocketLaunchIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}