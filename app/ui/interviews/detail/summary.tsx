import React from 'react';
import { BuildingOfficeIcon, BriefcaseIcon, DocumentTextIcon, ClockIcon, LinkIcon } from '@heroicons/react/24/outline';
import { CopyButton } from '../../shared/copy-button';
import { headers } from 'next/headers';

const InfoRow = ({ 
  icon, 
  label, 
  content 
}: { 
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}) => (
  // Changed from items-start to items-center
  <div className="flex items-center space-x-4 py-4">
    <div className="text-blue-400 flex-shrink-0">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-gray-400">{label}</p>
      <div className="mt-1">{content}</div>
    </div>
  </div>
);

const RegistrationUrl = () => {
  // Get host from headers
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const registrationUrl = `${protocol}://${host}/applicant-signup`;
  
  return (
    <div className="flex items-center space-x-2">
      <p className="text-white font-medium break-all">{registrationUrl}</p>
      <CopyButton textToCopy={registrationUrl} />
    </div>
  );
};

export const InterviewSummary = ({ interview }: { 
  interview: { 
    company_name: string;
    job_name: string;
    focus_areas: string[];
    max_duration: number;
    interviewer_style: string;
  } 
}) => (
  <div className="bg-gray-800 rounded-xl shadow-lg  px-6">
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
        content={<RegistrationUrl />}
      />

      <InfoRow
        icon={<DocumentTextIcon className="h-6 w-6" />}
        label="Focus Areas"
        content={
          <div className="flex flex-wrap gap-2">
            {interview.focus_areas.map((area) => (
                 <span 
                 key={area} 
                 className="px-3 py-1 border border-gray-600 text-gray-300 text-sm"
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
            <p className="text-white">{interview.max_duration} minute interview, {interview.interviewer_style.toLocaleLowerCase()} style</p>
          </div>
        }
      />
    </div>
  </div>
);