'use client';

import { lusitana } from '@/app/ui/fonts';
import {
    AtSymbolIcon,
    PhoneIcon,
    ExclamationCircleIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button'
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

type AddParticipantState = {
    error?: string;
} | undefined;

// Temporary simplified version that just allows navigation
const saveAccount = async () => {
    return { error: undefined };
};

export default function AccountForm() {
    const [state, action] = useFormState(saveAccount, undefined);
    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (formData: FormData) => {
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

                    {/* <SignUpButton />
                    <div className="flex h-8 items-end space-x-1">
                        {state?.error && (
                            <>
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                <p aria-live="polite" className="text-sm text-red-500">
                                    {state.error}
                                </p>
                            </>
                        )}
                    </div> */}
                </div>
            </div>
        </form>
    );
}

// function SignUpButton() {
//     const { pending } = useFormStatus();
//     return (
//         <Button className="mt-12 w-[70px] justify-center items-center" aria-disabled={pending}>
//             Save 
//             {/* <PlusCircleIcon className="ml-auto h-5 w-5 text-gray-50" /> */}
//         </Button>
//     );
// }