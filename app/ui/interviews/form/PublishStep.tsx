import React, { useState } from 'react';
import { Button } from '@/app/ui/button';
import { CheckCircle, Copy, Briefcase, User, Target, Clock, UserCircle } from 'lucide-react';
import { format } from 'date-fns';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import { InterviewFormData, useInterviewForm } from './InterviewFormContext';

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
    <div className="p-4 space-y-4">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-300">Company Details</p>
            <p className="text-white">{formData.company_name}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-300">Position</p>
            <p className="text-white">{formData.job_name}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <UserCircle className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-300">Applicants</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {formData.applicants.map((applicant, index) => (
                <div key={index} className="px-2 py-1 rounded-full bg-gray-700">
                  <p className="text-sm text-gray-300">{applicant.name}</p>
                  <p className="text-xs text-gray-400">{applicant.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Target className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-300">Focus Areas</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {formData.focus_areas.map((area) => (
                <span key={area} className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                  {area.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-300">Settings</p>
            <p className="text-white">Duration: {formData.max_duration} minutes</p>
            <p className="text-sm text-gray-400">Style: {formData.interviewer_style}</p>
            <p className="text-sm text-gray-400">
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
  const [publishedData, setPublishedData] = useState<PublishResponse | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [copySuccess, setCopySuccess] = useState<{
    email: Record<number, boolean>;
    code: Record<number, boolean>;
  }>({ email: {}, code: {} });
  const [error, setError] = useState<string | null>(null);

  const handlePublish = async () => {
    setIsPublishing(true);
    setError(null);
    try {
      const response = await submitForm();
      console.log('Publish response:', response);
      setPublishedData(response);
    } catch (error) {
      console.error('Error publishing interview:', error);
      setError('Failed to publish interview. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  const getEmailTemplate = (sessionInfo: SessionAccessInfo) => {
    const expiryDate = format(new Date(sessionInfo.expiration), 'MMMM do, yyyy');
    
    return `Dear ${sessionInfo.applicant_name},

You have been invited to complete a phone interview for the ${formData.job_name} position at ${formData.company_name}.

Please click the following link to register and begin your interview:
[Registration Link will be here]

Your access code is: ${sessionInfo.access_code}

The interview will take approximately ${formData.max_duration} minutes. Please complete it by ${expiryDate}.

Best regards,
${formData.company_name}`;
  };

  const handleCopy = async (text: string, type: 'email' | 'code', index: number) => {
    await navigator.clipboard.writeText(text);
    setCopySuccess(prev => ({
      ...prev,
      [type]: { ...prev[type], [index]: true }
    }));
    setTimeout(() => {
      setCopySuccess(prev => ({
        ...prev,
        [type]: { ...prev[type], [index]: false }
      }));
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {!publishedData ? (
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
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="h-5 w-5" />
            <span className="text-lg font-medium">Your interview is now published</span>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <p className="text-lg font-medium text-white">Interview Access Details</p>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {Array.isArray(publishedData.sessionAccess) && publishedData.sessionAccess.map((session, index) => (
                  <div key={index} className="border border-gray-700 rounded-md p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-medium">{session.applicant_name}</p>
                          <p className="text-sm text-gray-400">{session.applicant_email}</p>
                          <p className="mt-1 text-xs text-gray-400">
                            Expires: {format(new Date(session.expiration), 'MMMM do, yyyy')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between bg-gray-900 p-3 rounded-md">
                        <div className="font-mono text-white">
                          Access Code: {session.access_code}
                        </div>
                        <Button
                          onClick={() => handleCopy(session.access_code, 'code', index)}
                          className="h-8 px-2 bg-gray-700 hover:bg-gray-600"
                          title="Copy access code"
                        >
                          {copySuccess.code[index] ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={() => handleCopy(getEmailTemplate(session), 'email', index)}
                          className="h-8 bg-gray-700 hover:bg-gray-600"
                        >
                          {copySuccess.email[index] ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Copied Email Template
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Email Template
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishStep;