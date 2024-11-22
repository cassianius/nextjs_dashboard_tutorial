import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../button';
import { lusitana } from '@/app/ui/fonts';

interface FormState {
  message: string | null;
  errors?: {
    _form?: string[];
    [key: string]: string[] | undefined;
  };
}

interface DialogProps {
  message: string;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  onClose: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

interface SubmitButtonProps {
  label?: string;
}

function SubmitButton({ label = 'Submit' }: SubmitButtonProps) {
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
          <span>Processing...</span>
        </div>
      ) : (
        label
      )}
    </Button>
  );
}

export default function Dialog({ 
  message, 
  action,
  onClose,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel'
}: DialogProps) {
  const [state, dispatch] = useFormState(action, { message: null, errors: undefined });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">
        <form action={dispatch} className="space-y-4">
          <div className="flex-1 rounded-lg bg-gray-900 px-6 pb-4 pt-8">
            <div className="w-full">
              <h1 className={`${lusitana.className} mb-6 text-white text-2xl`}>
                {message}
              </h1>

              {state?.errors?._form && (
                <div className="rounded-md bg-red-500 p-3 mb-4">
                  {state.errors._form.map((error) => (
                    <p key={error} className="text-sm text-white">{error}</p>
                  ))}
                </div>
              )}

              <div className="mt-6 flex gap-4">
                <SubmitButton label={submitLabel} />
                <Button 
                  type="button" 
                  className="flex-1 bg-gray-600 hover:bg-gray-700"
                  onClick={onClose}
                >
                  {cancelLabel}
                </Button>
              </div>

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