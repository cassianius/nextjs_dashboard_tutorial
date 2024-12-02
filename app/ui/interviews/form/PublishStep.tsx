'use client';

import React, { useState } from 'react';
import { useInterviewForm } from './InterviewFormContext';
import { Button } from '@/app/ui/button';
import { CheckCircle, Copy } from 'lucide-react';
import { format } from 'date-fns';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

interface PublishResponse {
  interview: {
    id: number;
    company_name: string;
    job_name: string;
    applicant_name: string;
    max_duration: number;
  };
  sessionAccess: {
    access_code: string;
    pin: string;
    expiration: string;
  };
}

export const PublishStep = () => {
  const { formData, submitForm } = useInterviewForm();
  const [publishedData, setPublishedData] = useState<PublishResponse | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePublish = async () => {
    setIsPublishing(true);
    setError(null);
    try {
      const response = await submitForm();
      setPublishedData(response);
    } catch (error) {
      console.error('Error publishing interview:', error);
      setError('Failed to publish interview. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  const getEmailTemplate = () => {
    if (!publishedData) return '';
    
    const expiryDate = format(new Date(publishedData.sessionAccess.expiration), 'MMMM do, yyyy');
    
    return `Dear ${formData.applicant_name},

Your phone interview for the ${formData.job_name} position at ${formData.company_name} has been scheduled.

Please complete your interview by calling:

Phone Number: +1 (555) 0123-4567
Access Code: ${publishedData.sessionAccess.access_code}
PIN: ${publishedData.sessionAccess.pin}

The interview will take approximately ${formData.max_duration} minutes. Please complete it by ${expiryDate}.

Best regards,
${formData.company_name}`;
  };

  const copyEmailTemplate = async () => {
    await navigator.clipboard.writeText(getEmailTemplate());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      {!publishedData ? (
        <div className="text-center">
          <Button
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-blue-600 hover:bg-blue-500 w-full max-w-sm"
          >
            <RocketLaunchIcon className="h-4 w-4 mr-2" />
            {isPublishing ? 'Publishing...' : 'Publish Interview'}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="h-5 w-5" />
            <span className="text-lg font-medium">Your interview is now published</span>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg space-y-4 border border-gray-700">
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-300">
                Provide these details to the applicant:
              </p>
              <div className="space-y-3">
                <p className="text-xl text-white font-mono">
                  Phone: +1 (555) 0123-4567
                </p>
                <p className="text-lg text-white font-mono">
                  Access Code: {publishedData.sessionAccess.access_code}
                </p>
                <p className="text-lg text-white font-mono">
                  PIN: {publishedData.sessionAccess.pin}
                </p>
                <p className="text-sm text-gray-400">
                  Expires: {format(new Date(publishedData.sessionAccess.expiration), 'MMMM do, yyyy')}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-white">
                Email Template
              </label>
              <Button
                onClick={copyEmailTemplate}
                className="h-8 px-2 bg-gray-800 hover:bg-gray-700"
              >
                {copySuccess ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <textarea
              readOnly
              rows={12}
              className="w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] px-3 text-sm outline-2"
              value={getEmailTemplate()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
