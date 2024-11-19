'use client';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions/authenticate';
import Link from 'next/link';

export default function LoginForm() {
  const [code, action] = useFormState(authenticate, undefined);
  
  return (
    <form action={action}>
      <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-white text-2xl`}>
          Please log in below
        </h1>
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
                placeholder="Email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-white"
                htmlFor="password"
              >
                Password
              </label>
              <Link 
                href="/forgot-password" 
                className="mb-3 mt-5 text-xs text-white underline hover:text-gray-300"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                className="peer block w-full rounded-md text-white border bg-gray-800 py-[9px] mb-12 pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white" />
            </div>
          </div>
        </div>
        <LoginButton />
        <div className="flex h-8 items-end space-x-1">
          {code === 'CredentialSignin' && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Invalid credentials
              </p>
            </>
          )}
        </div>
        <div className="mt-4 text-center text-xs text-gray-400">
        </div>
        <div className="mt-4 text-center text-xs text-white">
          Don't have an account?{' '}
          <Link href="/signup-user" className="text-white underline hover:text-gray-300">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}