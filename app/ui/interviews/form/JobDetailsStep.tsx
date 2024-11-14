'use client';

import React from 'react';
import { useInterviewForm } from './InterviewFormContext';

export const JobDetailsStep = () => {
  const { formData, updateFormData } = useInterviewForm();

  return (
    <div>
      <div className="mb-4">
        <label className="mb-3 mt-5 block text-xs font-medium text-white">
          Job Description
        </label>
        <div className="space-y-2">
          <textarea 
            className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2 placeholder:text-gray-400"
            rows={4}
            placeholder="Paste job description here..."
            required
            value={formData.jobDescription}
            onChange={(e) => updateFormData('jobDescription', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-3 mt-5 block text-xs font-medium text-white">
            Company
          </label>
          <input
            className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2 placeholder:text-gray-400"
            type="text"
            placeholder="Company name"
            required
            value={formData.company}
            onChange={(e) => updateFormData('company', e.target.value)}
          />
        </div>

        <div>
          <label className="mb-3 mt-5 block text-xs font-medium text-white">
            Role Category
          </label>
          <select 
            className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2"
            required
            value={formData.roleCategory}
            onChange={(e) => updateFormData('roleCategory', e.target.value)}
          >
            <option value="">Select category</option>
            <option>Engineering</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Product</option>
            <option>Design</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* ... rest of the component ... */}
    </div>
  );
};