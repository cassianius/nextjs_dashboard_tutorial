'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  UserIcon,
  ExclamationCircleIcon,
  PhoneIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

type SignUpState = {
  error?: string;
} | undefined;

const signUp = async () => {
  return { error: undefined };
};

export default function OnboardForm() {
  const [state, action] = useFormState(signUp, undefined);
  const router = useRouter();
  
  const handleSubmit = async (formData: FormData) => {
    router.push('signup/companyProfile');
  };
  
  return (
    <form action={handleSubmit}>
      <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
        <div className="mb-8">
          <h1 className={`${lusitana.className} mb-3 text-white text-2xl`}>
            Create your account
          </h1>
          <p className="text-gray-300 text-sm">
            Welcome to our interview platform! After signing up, you'll receive:
          </p>
          <ul className="mt-2 text-gray-300 text-sm list-disc list-inside space-y-1">
            <li>A unique access code for your interviews</li>
            <li>A dedicated phone number to conduct interviews</li>
            <li>Immediate access to schedule your first interview</li>
          </ul>
        </div>

        <div className="w-full">
          {/* First Name Field */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-300"
              htmlFor="firstName"
            >
              First Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-gray-400"
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                required
              />
              <UserIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-300" />
            </div>
          </div>
          
          {/* Last Name Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-300"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-gray-400"
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                required
              />
              <UserIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-300" />
            </div>
          </div>
          
          {/* Email Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-gray-400"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-300" />
            </div>
          </div>
          
          {/* Phone Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-300"
              htmlFor="phone"
            >
              Phone
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-gray-400"
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                required
              />
              <PhoneIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-300" />
            </div>
          </div>

          {/* Access Code Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-300"
              htmlFor="accessCode"
            >
              Access Code
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-gray-400 uppercase"
                id="accessCode"
                type="text"
                name="accessCode"
                placeholder="Enter access code"
                pattern="[A-Za-z0-9]+"
                maxLength={12}
                required
              />
              <KeyIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-gray-300" />
            </div>
          </div>
        </div>

        <SignUpButton />
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
      Continue to Company Profile <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}