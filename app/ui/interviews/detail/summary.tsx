import React from 'react';
import { BuildingOfficeIcon, BriefcaseIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

const InfoRow = ({ 
  icon, 
  label, 
  content 
}: { 
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}) => (
  <div className="flex items-start space-x-4 py-4">
    <div className="text-blue-400">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-gray-400">{label}</p>
      <div className="mt-1">{content}</div>
    </div>
  </div>
);

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
            <p className="text-white">{interview.max_duration} minute interview</p>
            <p className="text-white">{interview.interviewer_style} style</p>
          </div>
        }
      />
    </div>
  </div>
);