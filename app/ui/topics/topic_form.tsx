import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { lusitana } from '@/app/ui/fonts';
import { createTopic, updateTopic } from '@/app/actions/topic';
import { useRouter } from 'next/navigation';
import { DocumentTextIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { InterviewTopic } from '@prisma/client';
import { Button } from '../button';

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
        'Save Topic'
      )}
    </Button>
  );
}

const initialState = {
  message: null,
  errors: undefined,
  success: false,
};

interface TopicFormProps {
  initialData?: {
    id: string;
    topic: InterviewTopic;
    goal: string;
    probe_level: number;
  };
  onClose?: () => void;
  onSuccess?: () => void;
  mode?: 'create' | 'edit';
}

export default function TopicForm({
  initialData,
  onClose,
  onSuccess,
  mode = 'create'
}: TopicFormProps) {
  const router = useRouter();
  const [state, dispatch] = useFormState(
    mode === 'edit'
      ? updateTopic.bind(null, initialData?.id!)
      : createTopic,
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
              {mode === 'edit' ? 'Edit Topic' : 'New Topic'}
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
              {/* Topic Field */}
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="topic"
                >
                  Topic Category
                </label>
                <div className="relative">
                  <select
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                      state?.errors?.topic ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="topic"
                    name="topic"
                    defaultValue={initialData?.topic || ''}
                    required
                  >
                    {Object.values(InterviewTopic).map((topic) => (
                      <option key={topic} value={topic}>
                        {topic.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                  <DocumentTextIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.topic && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.topic.map((error: string) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Goal Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="goal"
                >
                  Goal
                </label>
                <div className="relative">
                  <textarea
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 min-h-[100px] ${
                      state?.errors?.goal ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="goal"
                    name="goal"
                    placeholder="Enter topic goal..."
                    defaultValue={initialData?.goal}
                    required
                  />
                  <DocumentTextIcon className="pointer-events-none absolute text-gray-400 left-3 top-[10px] h-[18px] w-[18px] peer-focus:text-white" />
                </div>
                {state?.errors?.goal && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.goal.map((error: string) => (
                      <p key={error}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Probe Level Field */}
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-white"
                  htmlFor="probe_level"
                >
                  Probe Level
                </label>
                <div className="relative">
                  <select
                    className={`peer block w-full rounded-md text-white border bg-gray-800 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400 ${
                      state?.errors?.probe_level ? 'border-red-500' : 'border-gray-600'
                    }`}
                    id="probe_level"
                    name="probe_level"
                    defaultValue={initialData?.probe_level || 5}
                    required
                  >
                    <option value="1">1 - Nice to have</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5 - Must include</option>
                  </select>
                  <AdjustmentsHorizontalIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                </div>
                {state?.errors?.probe_level && (
                  <div className="mt-1 text-xs text-red-500">
                    {state.errors.probe_level.map((error: string) => (
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