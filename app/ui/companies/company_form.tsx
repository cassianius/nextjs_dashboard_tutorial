import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  BuildingOfficeIcon,
  GlobeAltIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { lusitana } from '@/app/ui/fonts';
import { createCompany } from '@/app/actions/company';
import { useRouter } from 'next/navigation'; // Make sure to import from next/navigation

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button 
      type="submit" 
      className="flex-1"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
          <span>Saving...</span>
        </div>
      ) : (
        'Save Company'
      )}
    </Button>
  );
}

const initialState = {
  message: null,
  errors: undefined,
  success: false,
};

const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '10-100', label: '10-100 employees' },
  { value: '100-1,000', label: '100-1,000 employees' },
  { value: '1,000-10,000', label: '1,000-10,000 employees' },
  { value: '10,000+', label: '10,000+ employees' },
];

export default function CompanyForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const [state, dispatch] = useFormState(createCompany, initialState);

  React.useEffect(() => {
    if (state?.success) {
      // Close the form
      onClose?.();
      // Refresh the page data and redirect
      router.refresh();
      router.push('/dashboard/companies');
    }
  }, [state?.success, onClose, router]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">
        <form action={dispatch} className="space-y-4">
          <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-white text-2xl`}>
              Company Information
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
              {/* Company Name Field */}
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="name"
                >
                  Company Name
                </label>
                <div className="relative">
                  <input
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                      state?.errors?.name ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter company name"
                    required
                  />
                  <BuildingOfficeIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.name && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.name.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Headquarters Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="headquarters"
                >
                  Headquarters Location
                </label>
                <div className="relative">
                  <input
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                      state?.errors?.headquarters ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="headquarters"
                    type="text"
                    name="headquarters"
                    placeholder="City, Country"
                    required
                  />
                  <BuildingStorefrontIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.headquarters && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.headquarters.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Industry Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="industry"
                >
                  Industry
                </label>
                <div className="relative">
                  <select
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                      state?.errors?.industry ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="industry"
                    name="industry"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select industry</option>
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="education">Education</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="transportation">Transportation</option>
                    <option value="energy">Energy</option>
                    <option value="other">Other</option>
                  </select>
                  <BuildingOfficeIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.industry && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.industry.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Company Size Field */}
              <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-white"
                htmlFor="size"
              >
                Company Size
              </label>
              <div className="relative">
                <select
                  className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                    state?.errors?.size ? 'border-red-500' : 'border-gray-600'
                  }`}
                  id="size"
                  name="size"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>Select company size</option>
                  {COMPANY_SIZES.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <UserGroupIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
              </div>
              {state?.errors?.size && (
                <div className="mt-1 text-xs text-red-500">
                  {state.errors.size.map((error) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
            </div>

              {/* Website Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="website"
                >
                  Website
                </label>
                <div className="relative">
                  <input
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                      state?.errors?.website ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="website"
                    type="url"
                    name="website"
                    placeholder="https://example.com"
                    required
                  />
                  <GlobeAltIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.website && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.website.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Founded Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="date_founded"
                >
                  Date Founded
                </label>
                <div className="relative">
                  <input
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                      state?.errors?.date_founded ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="date_founded"
                    type="date"
                    name="date_founded"
                    required
                  />
                  <CalendarIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.date_founded && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.date_founded.map((error) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="mt-6 flex gap-4">
            <SubmitButton />
            <Button 
              type="button" 
              className="flex-1 bg-gray-600 hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>

              {/* Success Message */}
              {state?.message && (
                <p className="mt-4 text-sm text-green-500">{state.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}