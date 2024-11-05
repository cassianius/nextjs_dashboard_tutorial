'use client';

import { lusitana } from '@/app/ui/fonts';
import {
    CalendarIcon,
    UserGroupIcon,
    BuildingOfficeIcon,
    DocumentTextIcon,
    QuestionMarkCircleIcon,
    ExclamationCircleIcon,
    ClockIcon,
    XCircleIcon,
    PlusCircleIcon,
    AcademicCapIcon,
    ChatBubbleLeftRightIcon,
    BeakerIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type AddInterviewState = {
    error?: string;
} | undefined;

const addInterview = async () => {
    return { error: undefined };
};

export default function FocusGroupSimulationForm() {
    const [state, action] = useFormState(addInterview, undefined);
    const router = useRouter();
    const [showOtherIndustry, setShowOtherIndustry] = useState(false);

    const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShowOtherIndustry(e.target.value === 'other');
    };

    const handleSubmit = async (formData: FormData) => {
        // Implementation here
    };

    const [questions, setQuestions] = useState<string[]>(['']); // Initialize with one empty question
    const [outcomes, setOutcomes] = useState<string[]>(['']); // Initialize with one empty outcome

    const addQuestion = () => {
        setQuestions([...questions, '']);
    };

    const removeQuestion = (index: number) => {
        if (questions.length > 1) {
            const newQuestions = questions.filter((_, i) => i !== index);
            setQuestions(newQuestions);
        }
    };

    const updateQuestion = (index: number, value: string) => {
        const newQuestions = [...questions];
        newQuestions[index] = value;
        setQuestions(newQuestions);
    };




    const addOutcome = () => {
        setOutcomes([...outcomes, '']);
    };

    const removeOutcome = (index: number) => {
        if (outcomes.length > 1) {
            const newOutcomes = outcomes.filter((_, i) => i !== index);
            setOutcomes(newOutcomes);
        }
    };

    const updateOutcome = (index: number, value: string) => {
        const newOutcomes = [...outcomes];
        newOutcomes[index] = value;
        setOutcomes(newOutcomes);
    };


    return (
        <form action={handleSubmit}>
            <div className="flex-1 rounded-lg bg-gray-900 pb-4 pt-5">
                <div className="max-w-[600px]">
                    {/* ... (previous fields remain the same until industry) ... */}

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
                                <select
                                    className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2"
                                    id="industry"
                                    name="industry"
                                    onChange={handleIndustryChange}
                                    required
                                >
                                    <option value="">Select industry</option>
                                    <option value="technology">Technology</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="finance">Finance</option>
                                    <option value="retail">Retail</option>
                                    <option value="manufacturing">Manufacturing</option>
                                    <option value="other">Other</option>
                                </select>
                                <BuildingOfficeIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Other Industry Field - Only shows when 'other' is selected */}
                    {showOtherIndustry && (
                        <div className="mt-4">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="other_industry"
                            >
                                Specify Industry
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                    id="other_industry"
                                    type="text"
                                    name="other_industry"
                                    placeholder="Please specify your industry"
                                    required
                                />
                                <BuildingOfficeIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                            </div>
                        </div>
                    )}

                    {/* Interview Duration and Technical Knowledge Level */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="duration"
                            >
                                Interview Duration (minutes)
                            </label>
                            <div className="relative">
                                <input
                                    className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-400"
                                    id="duration"
                                    type="number"
                                    name="duration"
                                    min="15"
                                    max="120"
                                    step="15"
                                    placeholder="60"
                                    required
                                />
                                <ClockIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                            </div>
                        </div>

                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="technical_level"
                            >
                                Technical Knowledge Level
                            </label>
                            <div className="relative">
                                <select
                                    className="block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 text-sm outline-2"
                                    id="technical_level"
                                    name="technical_level"
                                    required
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="expert">Expert</option>
                                </select>
                                <AcademicCapIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Interview Style */}
                    <div className="mt-8">
                        <label className="mb-3 mt-5 block text-xs font-medium text-white">
                            Interviewer Style
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center text-white text-sm">
                                <input
                                    type="radio"
                                    name="interviewer_style"
                                    value="friendly"
                                    className="mr-2 bg-gray-300"
                                    required
                                />
                                Friendly
                            </label>
                            <label className="flex items-center text-white text-sm">
                                <input
                                    type="radio"
                                    name="interviewer_style"
                                    value="formal"
                                    className="mr-2 bg-gray-300"
                                />
                                Formal
                            </label>
                            <label className="flex items-center text-white text-sm">
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

                    {/* Response Depth and Bias Mitigation */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="response_depth"
                            >
                                Response Depth
                            </label>
                            <select
                                className="block w-full rounded-md text-white border bg-gray-900 py-[9px] px-3 text-sm outline-2"
                                id="response_depth"
                                name="response_depth"
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
                                htmlFor="bias_mitigation"
                            >
                                Bias Mitigation Level
                            </label>
                            <select
                                className="block w-full rounded-md text-white border bg-gray-900 py-[9px] px-3 text-sm outline-2"
                                id="bias_mitigation"
                                name="bias_mitigation"
                                required
                            >
                                <option value="standard">Standard</option>
                                <option value="enhanced">Enhanced</option>
                                <option value="strict">Strict</option>
                            </select>
                        </div>
                    </div>

                    {/* Conversation Flow Options */}
                    <div className="mt-4 space-y-2">
                        <label className="flex items-center text-white text-sm">
                            <input
                                type="checkbox"
                                name="allow_tangents"
                                className="mr-2 bg-gray-300"
                            />
                            Allow Natural Tangents
                        </label>
                        <label className="flex items-center text-white text-sm">
                            <input
                                type="checkbox"
                                name="structured_format"
                                className="mr-2 bg-gray-300"
                            />
                            Use Structured Format
                        </label>
                    </div>

                    {/* Key Questions */}
                    <div className="mt-4">
                        <div className="flex justify-between items-center">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="key_questions"
                            >
                                Key Questions
                            </label>
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="flex items-center text-xs text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                <PlusCircleIcon className="h-4 w-4 mr-1" />
                                Add Question
                            </button>
                        </div>
                        <div className="space-y-2">
                            {questions.map((question, index) => (
                                <div key={index} className="relative flex items-center gap-2">
                                    <div className="flex-grow relative">
                                        <input
                                            className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-gray-400"
                                            type="text"
                                            value={question}
                                            onChange={(e) => updateQuestion(index, e.target.value)}
                                            placeholder={`Question ${index + 1}`}
                                            required
                                        />
                                        <QuestionMarkCircleIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                                    </div>
                                    {questions.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeQuestion(index)}
                                            className="text-gray-400 hover:text-red-400 transition-colors"
                                            aria-label="Remove question"
                                        >
                                            <XCircleIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            Add up to 10 key questions for your interview
                        </p>
                    </div>

                    {/* Desired Outcomes */}
                    <div className="mt-4">
                        <div className="flex justify-between items-center">
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="desired_outcomes"
                            >
                                Desired Outcomes
                            </label>
                            <button
                                type="button"
                                onClick={addOutcome}
                                className="flex items-center text-xs text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                <PlusCircleIcon className="h-4 w-4 mr-1" />
                                Add Outcome
                            </button>
                        </div>
                        <div className="space-y-2">
                            {outcomes.map((outcome, index) => (
                                <div key={index} className="relative flex items-center gap-2">
                                    <div className="flex-grow relative">
                                        <input
                                            className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-gray-400"
                                            type="text"
                                            value={outcome}
                                            onChange={(e) => updateOutcome(index, e.target.value)}
                                            placeholder={`Outcome ${index + 1}`}
                                            required
                                        />
                                        <QuestionMarkCircleIcon className="pointer-events-none absolute text-gray-400 left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 peer-focus:text-white" />
                                    </div>
                                    {outcomes.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeOutcome(index)}
                                            className="text-gray-400 hover:text-red-400 transition-colors"
                                            aria-label="Remove outcome"
                                        >
                                            <XCircleIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            Add up to 10 key outcomes for your interview
                        </p>
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