'use client';

import React from 'react';
import { useInterviewForm } from './InterviewFormContext';
import { PlusCircleIcon } from 'lucide-react';

export const ApplicantStep = () => {
  const { formData, updateFormData } = useInterviewForm();

  return (
  <div className="max-w-[600px]">
  <div className="mb-4">
    <label className="mb-3 mt-5 block text-xs font-medium text-white" htmlFor="applicant_email">
      Applicant Email
    </label>
    <input
      className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2 placeholder:text-gray-400"
      id="applicant_email"
      type="email"
      name="applicant_email"
      placeholder="applicant@example.com"
      required
    />
  </div>

  <div className="mt-4">
    <label className="mb-3 mt-5 block text-xs font-medium text-white">
      Resume
    </label>
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-32 border border-gray-600 border-dashed rounded-md cursor-pointer hover:bg-gray-800">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <PlusCircleIcon className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-sm text-gray-400">Upload Resume (PDF)</p>
        </div>
        <input type="file" className="hidden" accept=".pdf" />
      </label>
    </div>
  </div>
</div>
)};