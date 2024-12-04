'use client';

import React from 'react';
import { useInterviewForm } from './InterviewFormContext';

export const ApplicantStep = () => {
  const { formData, updateFormData } = useInterviewForm();

  const handleResumeChange = (text: string) => {
    updateFormData('applicant_resume', text);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-xs font-medium text-white">
          Full Name*
        </label>
        <input
          className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-800 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
          placeholder="Enter applicant's full name"
          value={formData.applicant_name}
          onChange={e => updateFormData('applicant_name', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-3 block text-xs font-medium text-white">
          Email Address*
        </label>
        <input
          type="email"
          className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-800 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
          placeholder="email@example.com"
          value={formData.applicant_email}
          onChange={e => updateFormData('applicant_email', e.target.value)}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
      </div>

      <div>
        <label className="mb-3 block text-xs font-medium text-white">
          Phone Number*
        </label>
        <input
          type="tel"
          className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-800 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
          placeholder="+1 (555) 000-0000"
          value={formData.applicant_phone}
          onChange={e => updateFormData('applicant_phone', e.target.value)}
          required
          pattern="^\+?[1-9]\d{1,14}$"
        />
        <p className="mt-1 text-sm text-gray-400">
          Please include country code (e.g., +1 for US/Canada)
        </p>
      </div>

      <div>
        <label className="mb-3 block text-xs font-medium text-white">
          Resume*
        </label>
        <textarea
          className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-800 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
          placeholder="Paste the applicant's resume text here..."
          rows={10}
          value={typeof formData.applicant_resume === 'string' ? formData.applicant_resume : ''}
          onChange={e => handleResumeChange(e.target.value)}
          required
        />
        <p className="mt-2 text-sm text-gray-400">
          Please paste the full text of the applicant's resume. This will be used to personalize the interview questions.
        </p>
      </div>
    </div>
  );
};