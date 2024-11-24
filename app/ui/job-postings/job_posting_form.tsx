import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  BriefcaseIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { lusitana } from '@/app/ui/fonts';
import { createJob, updateJob } from '@/app/actions/job-posting';
import { useRouter } from 'next/navigation';

const JOB_TYPES = [
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'internship', label: 'Internship' },
];

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
        'Save Job Posting'
      )}
    </Button>
  );
}

const initialState = {
  message: null,
  errors: undefined,
  success: false,
};

interface JobPostingFormProps {
  initialData?: {
    id: number;
    position: string;
    role: string;
    type: string;
    metadata: { description: string };
  };
  onClose?: () => void;
  onSuccess?: () => void;
  mode?: 'create' | 'edit';
}

export default function JobPostingForm({
  initialData,
  onClose,
  onSuccess,
  mode = 'create'
}: JobPostingFormProps) {
  const router = useRouter();
  const [state, dispatch] = useFormState(
    mode === 'edit'
      ? updateJob.bind(null, initialData?.id!)
      : createJob,
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
              {mode === 'edit' ? 'Edit Job Posting' : 'New Job Posting'}
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
              {/* Position Field */}
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="position"
                >
                  Job Title
                </label>
                <div className="relative">
                  <input
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                      state?.errors?.position ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="position"
                    type="text"
                    name="position"
                    placeholder="Enter position title"
                    defaultValue={initialData?.position}
                    required
                  />
                  <BriefcaseIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.position && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.position.map((error: string) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Role Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="role"
                >
                  Job Role
                </label>
                <div className="relative">
                  <input
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                      state?.errors?.role ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="role"
                    type="text"
                    name="role"
                    placeholder="Enter role"
                    defaultValue={initialData?.role}
                    required
                  />
                  <UserGroupIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.role && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.role.map((error: string) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Job Type Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="type"
                >
                  Job Type
                </label>
                <div className="relative">
                  <select
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                      state?.errors?.type ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="type"
                    name="type"
                    defaultValue={initialData?.type || "full-time"}
                    required
                  >
                    {JOB_TYPES.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <ClockIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.type && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.type.map((error: string) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Job Description Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="rawDescription"
                >
                  Paste Job Description
                </label>
                <div className="relative">
                  <textarea
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 min-h-[200px] ${
                      state?.errors?.rawDescription ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="rawDescription"
                    name="rawDescription"
                    placeholder="Enter job description"
                    defaultValue={initialData?.metadata?.description}
                    required
                  />
                  <DocumentTextIcon className="pointer-events-none absolute text-gray-400 left-3 top-[18px] h-[18px] w-[18px] peer-focus:text-white" />
                </div>
                {state?.errors?.rawDescription && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.rawDescription.map((error: string) => (
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