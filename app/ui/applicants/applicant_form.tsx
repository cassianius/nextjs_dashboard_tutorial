import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import PhoneInput from '@/app/ui/shared/phone-input'

import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { lusitana } from '@/app/ui/fonts';
import { createApplicant, updateApplicant } from '@/app/actions/applicant';
import { useRouter } from 'next/navigation';

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
        'Save Applicant'
      )}
    </Button>
  );
}

const initialState = {
  message: null,
  errors: undefined,
  success: false,
};

interface ApplicantFormProps {
  initialData?: {
    id: number;
    first: string;
    last: string;
    email: string;
    phone: string;
    metadata: { resume: string };
  };
  onClose?: () => void;
  onSuccess?: () => void;
  mode?: 'create' | 'edit';
}

export default function ApplicantForm({
  initialData,
  onClose,
  onSuccess,
  mode = 'create'
}: ApplicantFormProps) {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState(initialData?.phone || '');
  const [state, dispatch] = useFormState(
    mode === 'edit'
      ? updateApplicant.bind(null, initialData?.id!)
      : createApplicant,
    initialState
  );

  React.useEffect(() => {
    if (state?.success) {
      onSuccess?.();
      onClose?.();
      router.refresh();
    }
  }, [state?.success, onSuccess, onClose, router]);

  const handleSubmit = (formData: FormData) => {
    // Replace the phone field value with our formatted version
    formData.set('phone', phoneNumber);
    return dispatch(formData);
  };

  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">
        <form action={dispatch} className="space-y-4">
          <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-white text-2xl`}>
              {mode === 'edit' ? 'Edit Applicant' : 'New Applicant'}
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
              {/* First Name Field */}
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="first"
                >
                  First Name
                </label>
                <div className="relative">
                  <input
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                      state?.errors?.first ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="first"
                    type="text"
                    name="first"
                    placeholder="Enter first name"
                    defaultValue={initialData?.first}
                    required
                  />
                  <UserIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.first && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.first.map((error: string) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Last Name Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="last"
                >
                  Last Name
                </label>
                <div className="relative">
                  <input
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                      state?.errors?.last ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="last"
                    type="text"
                    name="last"
                    placeholder="Enter last name"
                    defaultValue={initialData?.last}
                    required
                  />
                  <UserIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.last && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.last.map((error: string) => (
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
                    placeholder="Enter email address"
                    defaultValue={initialData?.email}
                    required
                  />
                  <EnvelopeIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.email && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.email.map((error: string) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="phone"
            >
              Phone
            </label>
            <PhoneInput
              value={phoneNumber}
              onChange={setPhoneNumber}
              hasError={!!state?.errors?.phone}
              errors={state?.errors?.phone}
            />
          </div>

              {/* Resume Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="rawResume"
                >
                  Paste Resume
                </label>
                <div className="relative">
                  <textarea
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 min-h-[200px] ${
                      state?.errors?.rawResume ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="rawResume"
                    name="rawResume"
                    placeholder="Enter resume text"
                    defaultValue={initialData?.metadata?.resume}
                    required
                  />
                  <DocumentTextIcon className="pointer-events-none absolute text-gray-400 left-3 top-[10px] h-[18px] w-[18px] peer-focus:text-white" />
                </div>
                {state?.errors?.rawResume && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.rawResume.map((error: string) => (
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