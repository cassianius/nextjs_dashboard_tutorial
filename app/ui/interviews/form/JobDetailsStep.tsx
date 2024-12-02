'use client';

import React from 'react';
import { useInterviewForm } from './InterviewFormContext';

export const JobDetailsStep = () => {
  const { formData, updateFormData } = useInterviewForm();

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-xs font-medium text-white">
          Job Title*
        </label>
        <input
          className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
          placeholder="Enter job title"
          value={formData.job_name}
          onChange={e => updateFormData('job_name', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-3 block text-xs font-medium text-white">
          Job Description*
        </label>
        <textarea
          className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
          placeholder="Enter the full job description..."
          rows={8}
          value={formData.job_description ? JSON.stringify(formData.job_description) : ''}
          onChange={e => {
            try {
              // Store as a JSON object if it's valid JSON, otherwise store as a plain string
              const parsed = JSON.parse(e.target.value);
              updateFormData('job_description', parsed);
            } catch {
              // If not valid JSON, store as a simple object with a text field
              updateFormData('job_description', { text: e.target.value });
            }
          }}
          required
        />
        <p className="mt-2 text-sm text-gray-400">
          Please provide a detailed job description including responsibilities, requirements, and qualifications. This information will be used to generate relevant interview questions.
        </p>
      </div>
    </div>
  );
};