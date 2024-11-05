'use client';

import { lusitana } from '@/app/ui/fonts';
import {
    CalendarIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    DocumentTextIcon,
    QuestionMarkCircleIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

type AddInterviewState = {
    error?: string;
} | undefined;

const addInterview = async () => {
    return { error: undefined };
};

export default function AddInterviewForm() {
    const [state, action] = useFormState(addInterview, undefined);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        // const result = await action(formData);
        // if (!result?.error) {
        //   router.push('/interviews');
        // }
    };

    return (
        <form action={handleSubmit}>
            <div className="flex-1 rounded-lg bg-gray-900 pb-4 pt-5">
                <div className="max-w-[600px]">
                    {/* Basic Information Section */}
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="subject"
                        >
                            Subject
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                id="subject"
                                type="text"
                                name="subject"
                                placeholder="Interview subject"
                                required
                            />
                            <DocumentTextIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <div className="relative">
                            <textarea
                                className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                id="description"
                                name="description"
                                placeholder="Interview description"
                                rows={3}
                                required
                            />
                            <DocumentTextIcon className="pointer-events-none absolute text-gray-400 left-3 top-[11px] h-[18px] w-[18px] peer-focus:text-white" />
                        </div>
                    </div>

                    {/* Company and Industry */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="company"
                            >
                                Company
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                    id="company"
                                    type="text"
                                    name="company"
                                    placeholder="Company name"
                                    required
                                />
                                <BuildingOfficeIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                            </div>
                        </div>

                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="industry"
                            >
                                Industry
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                    id="industry"
                                    type="text"
                                    name="industry"
                                    placeholder="Industry"
                                    required
                                />
                                <BuildingOfficeIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Group Size and Participant IDs */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="group_size"
                            >
                                Group Size
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                    id="group_size"
                                    type="number"
                                    name="group_size"
                                    min="1"
                                    placeholder="Number of participants"
                                    required
                                />
                                <UserGroupIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                            </div>
                        </div>

                        {/* <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="participant_ids"
                            >
                                Participant IDs
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                    id="participant_ids"
                                    type="text"
                                    name="participant_ids"
                                    placeholder="Comma-separated IDs"
                                    required
                                />
                                <UserGroupIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                            </div>
                        </div> */}
                    </div>

                    {/* Interview Style and Structure */}
                    <div className="mt-4">
                        <label className="mb-3 mt-5 block text-xs font-medium text-white">
                            Interviewer Style
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center text-white text-sm ">
                                <input
                                    type="radio"
                                    name="interviewer_style"
                                    value="friendly"
                                    className="mr-2 bg-gray-300"
                                    required
                                />
                                Friendly
                            </label>
                            <label className="flex items-center text-white text-sm ">
                                <input
                                    type="radio"
                                    name="interviewer_style"
                                    value="formal"
                                    className="mr-2 bg-gray-300"
                                />
                                Formal
                            </label>
                            <label className="flex items-center text-white text-sm ">
                                <input
                                    type="radio"
                                    name="interviewer_style"
                                    value="probing"
                                    className="mr-2 bg-gray-300"
                                />
                                Probing
                            </label>
                        </div>
                    </div>

                    {/* Response Depth and Conversation Flow */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="desired_response_depth"
                            >
                                Desired Response Depth
                            </label>
                            <select
                                className="block w-full rounded-md text-white border bg-gray-900 py-[9px] px-3 text-sm outline-2"
                                id="desired_response_depth"
                                name="desired_response_depth"
                                required
                            >
                                <option value="brief">Brief</option>
                                <option value="moderate">Moderate</option>
                                <option value="in_depth">In-Depth</option>
                            </select>
                        </div>

                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="conversation_flow"
                            >
                                Conversation Flow
                            </label>
                            <select
                                className="block w-full rounded-md text-white border bg-gray-900 py-[9px] px-3 text-sm outline-2"
                                id="conversation_flow"
                                name="conversation_flow"
                                required
                            >
                                <option value="linear">Linear</option>
                                <option value="tangential">Tangential</option>
                            </select>
                        </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="mt-4 space-y-2">
                        <label className="flex items-center text-white text-sm">
                            <input
                                type="checkbox"
                                name="is_open_ended"
                                className="mr-2 bg-gray-300"
                                />
                            Open-ended Interview
                        </label>
                        <label className="flex items-center text-white text-sm">
                            <input
                                type="checkbox"
                                name="is_structured"
                                className="mr-2 bg-gray-300"
                                />
                            Structured Interview
                        </label>
                    </div>

                    {/* Key Questions */}
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="key_questions"
                        >
                            Key Questions
                        </label>
                        <div className="relative">
                            <textarea
                                className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                id="key_questions"
                                name="key_questions"
                                placeholder="Enter key questions (one per line)"
                                rows={3}
                                required
                            />
                            <QuestionMarkCircleIcon className="pointer-events-none absolute text-gray-400 left-3 top-[11px] h-[18px] w-[18px] peer-focus:text-white" />
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
            </div>
        </form>
    );
}

function SaveButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="mt-12 w-[70px] justify-center items-center" aria-disabled={pending}>
            Save
        </Button>
    );
}