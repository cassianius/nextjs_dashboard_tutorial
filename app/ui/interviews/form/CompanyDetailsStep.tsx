'use client';

import React from 'react';
import { useInterviewForm } from './InterviewFormContext';

export const CompanyDetailsStep = () => {
  const { formData, updateFormData } = useInterviewForm();

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-3 block text-xs font-medium text-white">
          Employer*
        </label>
        <input
          className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-800 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
          placeholder="Enter employer name"
          value={formData.company_name}
          onChange={e => updateFormData('company_name', e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-3 block text-xs font-medium text-white">
          Employer Description
          <span className="text-gray-400 ml-1">(optional)</span>
        </label>
        <textarea
          className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-800 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
          placeholder="Enter a description of the employer..."
          rows={6}
          value={typeof formData.company_description === 'string' ? formData.company_description : ''}
          onChange={e => updateFormData('company_description', e.target.value)}
        />
        <p className="mt-2 text-sm text-gray-400">
          This description will help set the context for the interview. You can include information about company culture, values, and mission.
        </p>
      </div>
    </div>
  );
};