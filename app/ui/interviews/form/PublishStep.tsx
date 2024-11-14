'use client';

import React from 'react';
import { useInterviewForm } from './InterviewFormContext';
import { Button } from '@/app/ui/button';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

export const PublishStep = () => {
  const { formData, updateFormData } = useInterviewForm();

  return (
    <div className="max-w-[600px]">
      <div className="space-y-4">
        <div>
          <label className="mb-3 mt-5 block text-xs font-medium text-white">
            Access Code Expiry
          </label>
          <input
            type="date"
            className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2"
          />
        </div>

        <div>
          <label className="mb-3 mt-5 block text-xs font-medium text-white">
            Email Template
          </label>
          <textarea
            rows={4}
            className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2 placeholder:text-gray-400"
            defaultValue={`Dear [Candidate],

Please complete your phone interview by calling +1 (555) 0123-4567 and entering access code: 1234

The interview will take approximately [duration] minutes. Please complete it by [expiry date].

Best regards,
[Company Name]`}
          />
        </div>

        <div className="mt-6">
          <Button className="flex items-center gap-2 w-full bg-blue-600 hover:bg-blue-500">
            <RocketLaunchIcon className="h-4 w-4" />
            Publish Interview
          </Button>
        </div>
      </div>
    </div>
  )
};