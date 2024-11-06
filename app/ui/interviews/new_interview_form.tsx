'use client';

import { lusitana } from '@/app/ui/fonts';
import {
    ExclamationCircleIcon,
    ClockIcon,
    XCircleIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../button';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Participant } from '@/app/lib/definitions';

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
    const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
    const [participantEmail, setParticipantEmail] = useState('');
    const [participantError, setParticipantError] = useState('');
    const [questions, setQuestions] = useState<string[]>(['']); 
    const [outcomes, setOutcomes] = useState<string[]>(['']); 

    const handleAddParticipant = async () => {
        setParticipantError('');
        if (!participantEmail) {
            setParticipantError('Please enter an email address');
            return;
        }

        try {
            const response = await fetch(`/api/participants/search?email=${encodeURIComponent(participantEmail)}`);
            const participant = await response.json();

            if (!participant) {
                setParticipantError('Participant not found');
                return;
            }

            if (selectedParticipants.some(p => p.id === participant.id)) {
                setParticipantError('Participant already added');
                return;
            }

            setSelectedParticipants([...selectedParticipants, participant]);
            setParticipantEmail('');
        } catch (error) {
            setParticipantError('Error finding participant');
        }
    };

    const removeParticipant = (participantId: string) => {
        setSelectedParticipants(selectedParticipants.filter(p => p.id !== participantId));
    };

    const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setShowOtherIndustry(e.target.value === 'other');
    };

    const handleSubmit = async (formData: FormData) => {
        // Implementation here
    };

    const addQuestion = () => {
        if (questions.length < 10) {
            setQuestions([...questions, '']);
        }
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
        if (outcomes.length < 10) {
            setOutcomes([...outcomes, '']);
        }
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
                                    className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2 placeholder:text-gray-400"
                                    id="company"
                                    type="text"
                                    name="company"
                                    placeholder="Company name"
                                    required
                                />
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
                                    className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2"
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
                            </div>
                        </div>
                    </div>

                    {/* Other Industry Field */}
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
                                    className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2 placeholder:text-gray-400"
                                    id="other_industry"
                                    type="text"
                                    name="other_industry"
                                    placeholder="Please specify your industry"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Interview Duration and Style */}
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
                                    className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2 placeholder:text-gray-400"
                                    id="duration"
                                    type="number"
                                    name="duration"
                                    min="15"
                                    max="120"
                                    step="15"
                                    placeholder="60"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                className="mb-3 mt-5 block text-xs font-medium text-white"
                                htmlFor="interview_style"
                            >
                                Interview Style
                            </label>
                            <div className="relative">
                                <select
                                    className="block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2"
                                    id="interview_style"
                                    name="interview_style"
                                    required
                                >
                                    <option value="friendly">Friendly</option>
                                    <option value="formal">Formal</option>
                                    <option value="probing">Probing</option>
                                </select>
                            </div>
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
                                            className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pr-10 text-sm outline-2 placeholder:text-gray-400"
                                            type="text"
                                            value={question}
                                            onChange={(e) => updateQuestion(index, e.target.value)}
                                            placeholder={`Question ${index + 1}`}
                                            required
                                        />
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
                    <div className="mt-1">
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
                                            className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] pr-10 text-sm outline-2 placeholder:text-gray-400"
                                            type="text"
                                            value={outcome}
                                            onChange={(e) => updateOutcome(index, e.target.value)}
                                            placeholder={`Outcome ${index + 1}`}
                                            required
                                        />
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

                    {/* Conversation Flow Options */}
                    <div className="mt-6 space-y-2">
                        <label className="flex items-center text-white text-sm">
                            <input
                                type="checkbox"
                                name="allow_tangents"
                                className="mr-2 bg-gray-300"
                            />
                            Allow for natural tangents and side discussions
                        </label>
                    </div>

                    {/* Participant Selection */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <label
                                className="mb-3 block text-xs font-medium text-white"
                                htmlFor="participant_email"
                            >
                                Participants
                            </label>
                        </div>

                        {/* Add Participant Input */}
                        <div className="flex gap-2">
                            <div className="flex-grow relative">
                                <input
                                    className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2 placeholder:text-gray-400"
                                    type="email"
                                    id="participant_email"
                                    value={participantEmail}
                                        onChange={(e) => setParticipantEmail(e.target.value)}
                                    placeholder="Enter participant email"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddParticipant}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-500 transition-colors flex items-center gap-1"
                            >
                                <PlusCircleIcon className="h-4 w-4" />
                                Add
                            </button>
                        </div>

                        {participantError && (
                            <p className="text-sm text-red-500 mt-1">{participantError}</p>
                        )}

                        {/* Selected Participants List */}
                        <div className="mt-4 space-y-2">
                            {selectedParticipants.map((participant) => (
                                <div
                                    key={participant.id}
                                    className="flex items-center justify-between p-3 rounded-md bg-gray-800 border border-gray-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                            <span className="text-sm text-white">
                                                {participant.first[0]}{participant.last[0]}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-white">
                                                {participant.first} {participant.last}
                                            </p>
                                            <p className="text-xs text-gray-400">{participant.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeParticipant(participant.id)}
                                        className="text-gray-400 hover:text-red-400 transition-colors"
                                        aria-label="Remove participant"
                                    >
                                        <XCircleIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {selectedParticipants.length > 0 && (
                            <p className="text-xs text-gray-400 mt-2">
                                {selectedParticipants.length} participant{selectedParticipants.length !== 1 ? 's' : ''} added
                            </p>
                        )}
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


//Dummy data