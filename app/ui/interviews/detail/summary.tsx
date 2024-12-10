// app/ui/interviews/detail/summary.tsx
import React from 'react';
import { BuildingOfficeIcon, BriefcaseIcon, DocumentTextIcon, ClockIcon, LinkIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { CopyButton } from '../../shared/copy-button';

const InfoRow = ({ 
  icon, 
  label, 
  content 
}: { 
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}) => (
  <div className="flex items-center space-x-4 py-4">
    <div className="text-blue-400 flex-shrink-0">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-gray-400">{label}</p>
      <div className="mt-1">{content}</div>
    </div>
  </div>
);

interface RegistrationUrlProps {
  registrationUrl: string;
}

const RegistrationUrl = ({ registrationUrl }: RegistrationUrlProps) => {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-white font-medium break-all">{registrationUrl}</p>
      <CopyButton textToCopy={registrationUrl} />
    </div>
  );
};

interface InterviewSummaryProps {
  interview: { 
    company_name: string;
    job_name: string;
    focus_areas: string[];
    max_duration: number;
    interviewer_style: string;
    created_at: string;  // Add this line
  };
  registrationUrl: string;
}

export const InterviewSummary = ({ interview, registrationUrl }: InterviewSummaryProps) => (
  <div className="bg-gray-800 rounded-xl shadow-lg px-6">
    <div className="divide-y divide-gray-700">
      <InfoRow
        icon={<BuildingOfficeIcon className="h-6 w-6" />}
        label="Company"
        content={<p className="text-white font-medium">{interview.company_name}</p>}
      />
      
      <InfoRow
        icon={<BriefcaseIcon className="h-6 w-6" />}
        label="Position"
        content={<p className="text-white font-medium">{interview.job_name}</p>}
      />
      
      <InfoRow
        icon={<LinkIcon className="h-6 w-6" />}
        label="Applicant Registration URL"
        content={<RegistrationUrl registrationUrl={registrationUrl} />}
      />

      <InfoRow
        icon={<DocumentTextIcon className="h-6 w-6" />}
        label="Focus Areas"
        content={
          <div className="flex flex-wrap gap-2">
            {interview.focus_areas.map((area) => (
              <span 
                key={area} 
                className="px-3 py-1 border border-gray-600 text-gray-300 text-xs"
              >
                {area.replace('_', ' ')}
              </span>
            ))}
          </div>
        }
      />
      
      <InfoRow
        icon={<ClockIcon className="h-6 w-6" />}
        label="Interview Settings"
        content={
          <div className="space-y-1">
            <p className="text-white">{interview.max_duration} minute interview, {interview.interviewer_style.toLowerCase()} style</p>
          </div>
        }
      />

      <InfoRow
        icon={<CalendarIcon className="h-6 w-6" />}
        label="Publish Date"
        content={<p className="text-white font-medium">{new Date(interview.created_at).toLocaleDateString()}</p>}
      />
    </div>
  </div>
);