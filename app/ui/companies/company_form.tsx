// app/ui/companies/company-form.tsx
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  BuildingOfficeIcon,
  GlobeAltIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { lusitana } from '@/app/ui/fonts';
import { createCompany, updateCompany } from '@/app/actions/company';
import { useRouter } from 'next/navigation';

const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '10-100', label: '10-100 employees' },
  { value: '100-1,000', label: '100-1,000 employees' },
  { value: '1,000-10,000', label: '1,000-10,000 employees' },
  { value: '10,000+', label: '10,000+ employees' },
];

const INDUSTRIES = [
  "Agriculture",
  "Mining",
  "Energy and Utilities",
  "Manufacturing",
  "Construction",
  "Retail and Wholesale Trade",
  "Hospitality and Tourism",
  "Transportation and Logistics",
  "Real Estate",
  "Information Technology and Software",
  "Telecommunications",
  "Media and Entertainment",
  "Education and Training",
  "Healthcare and Pharmaceuticals",
  "Financial Services",
  "Government and Public Administration",
  "Non-Profit and NGOs",
  "Aerospace and Defense",
  "Green Technology and Sustainability",
  "Professional Services",
  "Consumer Goods",
  "Sports and Recreation",
  "Food and Beverage",
  "Arts and Culture",
  "Automotive and Mobility",
  "Agritech and Foodtech"
];

interface CompanyFormProps {
  initialData?: {
    id: string;
    name: string;
    headquarters: string;
    industry: string;
    size: string;
    website: string;
  };
  onClose?: () => void;
  onSuccess?: () => void;
  mode?: 'create' | 'edit';
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="flex-1" disabled={pending}>
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

export default function CompanyForm({ 
  initialData, 
  onClose, 
  onSuccess,
  mode = 'create' 
}: CompanyFormProps) {
  const router = useRouter();
  const [state, dispatch] = useFormState(
    mode === 'edit' 
      ? updateCompany.bind(null, initialData?.id!) 
      : createCompany,
    initialState
  );

  React.useEffect(() => {
    if (state?.success) {
      onSuccess?.();
      onClose?.();
      router.refresh();
    }
  }, [state?.success, onSuccess, onClose, router]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">
        <form action={dispatch} className="space-y-4">
          <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-white text-2xl`}>
              {mode === 'edit' ? 'Edit Company' : 'New Company'}
            </h1>

            {/* Form error messages */}
            {state?.errors?._form && (
              <div className="rounded-md bg-red-500 p-3 mb-4">
                {state.errors._form.map((error: string) => (
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
                    defaultValue={initialData?.name}
                    required
                  />
                  <BuildingOfficeIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.name && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.name.map((error: string) => (
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
                    defaultValue={initialData?.headquarters}
                    required
                  />
                  <BuildingStorefrontIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.headquarters && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.headquarters.map((error: string) => (
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
                    defaultValue={initialData?.industry || ""}
                    required
                  >
                    <option value="" disabled>Select industry</option>
                    {INDUSTRIES.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  <BuildingOfficeIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.industry && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.industry.map((error: string) => (
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
                    defaultValue={initialData?.size || ""}
                    required
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
                    {state.errors.size.map((error: string) => (
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
                    defaultValue={initialData?.website}
                    required
                  />
                  <GlobeAltIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.website && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.website.map((error: string) => (
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