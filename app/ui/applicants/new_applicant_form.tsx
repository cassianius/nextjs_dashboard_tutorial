'use client';

import { lusitana } from '@/app/ui/fonts';
import {
    AtSymbolIcon,
    PhoneIcon,
    ExclamationCircleIcon,
    UserIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button'
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

type AddApplicantState = {
    error?: string;
} | undefined;

// Temporary simplified version that just allows navigation
const addApplicant = async () => {
    return { error: undefined };
};

export default function AddApplicantForm() {
    const [state, action] = useFormState(addApplicant, undefined);
    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (formData: FormData) => {
        // Get the files
        const fileInput = document.querySelector('#profile-upload') as HTMLInputElement;
        const files = fileInput?.files;
        
        if (files && files.length > 0) {
          // Append each file to the FormData
          for (let i = 0; i < files.length; i++) {
            formData.append('documents', files[i]);
          }
        }
        
        // Rest of your form submission logic
        // const result = await action(formData);
        // if (!result?.error) {
        //   router.push('signup/companyProfile');
        // }
      };

    return (
        <form action={handleSubmit}>
            <div className="flex-1 rounded-lg bg-gray-900 pb-4 pt-5">
                <div className="max-w-[400px]">





                    {/* First Name */}
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="name"
                        >
                            First Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                id="first"
                                type="text"
                                name="first"
                                placeholder="First name"
                                required
                            />
                            <UserIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                        </div>
                    </div>

                    {/* Last Name */}
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="name"
                        >
                            Last Name
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                id="last"
                                type="text"
                                name="last"
                                placeholder="Last name"
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
                                className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email address"
                                required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="phone"
                        >
                            Phone Number
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                id="phone"
                                type="tel"
                                name="phone"
                                placeholder="Phone number"
                                required
                            />
                            <PhoneIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
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
            </div>
        </form>
    );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col">
        <label
          className="mb-3 block text-xs font-medium text-white"
          htmlFor="profile-upload"
        >
          Upload Profile Documents
        </label>
        <div className="relative">
          <input
            type="file"
            id="profile-upload"
            name="profile-upload"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
            className="hidden"
            multiple
          />
          <label
            htmlFor="profile-upload"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-400 bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 hover:border-gray-300"
          >
            <PlusCircleIcon className="h-5 w-5" />
            Upload profile documents for this user
          </label>
          <p className="mt-2 text-xs text-gray-400">
            Accepted formats: PDF, DOC, XLS, CSV
          </p>
        </div>
      </div>
      
      <Button className="w-[70px] justify-center items-center" aria-disabled={pending}>
        Save 
      </Button>
    </div>
  );
}