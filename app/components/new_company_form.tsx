'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  GlobeAltIcon,
  BuildingOfficeIcon,
  ExclamationCircleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';

type CompanyProfileState = {
  error?: string;
} | undefined;

// We'll implement this later with proper error handling
const saveCompanyProfile = async (): Promise<CompanyProfileState> => {
  return { error: undefined };
};

export default function CompanyProfileForm() {
  const [state, action] = useFormState(saveCompanyProfile, undefined);
  
  return (
    <form action={action}>
      <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-white text-2xl`}>
          Company Profile
        </h1>
        <div className="w-full">
          {/* Company Name Field */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="companyName"
                type="text"
                name="companyName"
                placeholder="Enter company name"
                required
              />
              <BuildingOfficeIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
            </div>
          </div>
          
          {/* Website Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="website"
            >
              Website
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="website"
                type="url"
                name="website"
                placeholder="Enter company website"
                required
              />
              <GlobeAltIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
            </div>
          </div>
          
          {/* Headquarters Location Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="headquarters"
            >
              Headquarters Location
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="headquarters"
                type="text"
                name="headquarters"
                placeholder="Enter headquarters location"
                required
              />
              <BuildingOfficeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white" />
            </div>
          </div>
          
          {/* Company Size Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="size"
            >
              Company Size
            </label>
            <div className="relative">
              <select
                className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] mb-12 pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="size"
                name="size"
                required
              >
                <option value="" disabled selected>Select company size</option>
                <option value="1-10">1-10 employees</option>
                <option value="10-100">10-100 employees</option>
                <option value="100-1000">100-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
              <UsersIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-white" />
            </div>
          </div>
        </div>
        <SaveButton />
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

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Save Profile <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}