import React, { useState } from 'react';
import { Button } from '@/app/ui/button';
import { CheckCircle, Copy, Briefcase, User, Target, Clock, UserCircle } from 'lucide-react';
import { format } from 'date-fns';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { InterviewFormData, useInterviewForm } from './form_context';
import { useRouter } from 'next/navigation';

interface SessionAccessInfo {
  applicant_name: string;
  applicant_email: string;
  access_code: string;
  pin: string;
  expiration: Date;
}

interface PublishResponse {
  interview: {
    id: number;
    company_name: string;
    job_name: string;
    max_duration: number;
    account_id: string;
  };
  sessionAccess: SessionAccessInfo[];
}

const InterviewSummary = ({ formData }: { formData: InterviewFormData }) => (
  <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
    <div className="p-4 border-b border-gray-700">
      <h3 className="text-lg font-medium text-white">Interview Summary</h3>
    </div>
    <div className="p-4 space-y-6">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold text-gray-300">Company Details</p>
          <p className="text-sm text-white mt-1">{formData.company_name}</p>
        </div>

        <div>
          <p className="text-sm font-bold text-gray-300">Position</p>
          <p className="text-sm text-white mt-1">{formData.job_name}</p>
        </div>

        <div>
          <p className="text-sm font-bold text-gray-300">Applicants</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {formData.applicants.map((applicant, index) => (
              <div key={index} className="px-3 py-2 bg-gray-700">
                <p className="text-sm text-gray-300">{applicant.name}</p>
                <p className="text-xs text-gray-400">{applicant.email}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-gray-300">Focus Areas</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {formData.focus_areas.map((area) => (
              <span key={area} className="px-3 py-2 bg-gray-700 text-gray-300 text-xs">
                {area.replace('_', ' ')}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold text-gray-300">Settings</p>
          <div className="mt-1">
            <p className="text-sm text-white">Duration: {formData.max_duration} minutes</p>
            <p className="text-sm text-white">Style: {formData.interviewer_style}</p>
            <p className="text-sm text-white">
              Expires after: {formData.sessionSettings.expirationDays} days
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const PublishStep = () => {
  const { formData, submitForm } = useInterviewForm();
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePublish = async () => {
    setIsPublishing(true);
    setError(null);
    try {
      const response = await submitForm();
      console.log('Publish response:', response);
      router.push(`/dashboard/interviews/${response.interview.id}?success=true`);
        } catch (error) {
      console.error('Error publishing interview:', error);
      setError('Failed to publish interview. Please try again.');
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <InterviewSummary formData={formData} />
        <div className="flex justify-start">
          <Button
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-blue-600 hover:bg-blue-500"
          >
            <RocketLaunchIcon className="h-4 w-4 mr-2" />
            {isPublishing ? 'Publishing...' : 'Publish Interview'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublishStep;