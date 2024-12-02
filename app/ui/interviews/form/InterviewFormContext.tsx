'use client';

import React, { createContext, useContext, useState } from 'react';

// Define the FocusArea enum to match the schema
export enum FocusArea {
  TECHNICAL_SKILLS = 'TECHNICAL_SKILLS',
  PROBLEM_SOLVING = 'PROBLEM_SOLVING',
  COMMUNICATION = 'COMMUNICATION',
  ROLE_ALIGNMENT = 'ROLE_ALIGNMENT',
  CULTURAL_FIT = 'CULTURAL_FIT',
  LEADERSHIP = 'LEADERSHIP',
  PROJECT_EXPERIENCE = 'PROJECT_EXPERIENCE',
  SYSTEM_DESIGN = 'SYSTEM_DESIGN',
  CODE_QUALITY = 'CODE_QUALITY',
  BEHAVIORAL = 'BEHAVIORAL',
  TEAM_COLLABORATION = 'TEAM_COLLABORATION',
  INITIATIVE = 'INITIATIVE'
}

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

// Define session settings
interface SessionSettings {
  expirationDays: number;
}

// Define the shape of our form data based on the schema
interface InterviewFormData {
  // Company Details
  company_name: string;
  company_description?: string | Record<string, any>;
  
  // Job Details
  job_name: string;
  job_description?: string | Record<string, any>;
  
  // Interview Settings
  interviewer_style: 'Friendly' | 'Formal' | 'Probing';
  max_duration: number;
  focus_areas: FocusArea[];
  
  // Applicant Details
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  applicant_resume?: string | Record<string, any>;
  
  // Status
  status: 'Draft' | 'Active' | 'Archived' | 'Deleted';

  // Session Settings
  sessionSettings: SessionSettings;
}

// Default values aligned with the schema
const defaultFormData: InterviewFormData = {
  company_name: '',
  company_description: '',
  job_name: '',
  job_description: '',
  interviewer_style: 'Friendly',
  max_duration: 30,
  focus_areas: [],
  applicant_name: '',
  applicant_email: '',
  applicant_phone: '',
  applicant_resume: '',
  status: 'Draft',
  sessionSettings: {
    expirationDays: 7
  }
};

interface InterviewFormContextType {
  formData: InterviewFormData;
  updateFormData: (field: keyof InterviewFormData, value: any) => void;
  submitForm: () => Promise<PublishResponse>;
}

const InterviewFormContext = createContext<InterviewFormContextType | undefined>(undefined);

export function InterviewFormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<InterviewFormData>(defaultFormData);

  const updateFormData = (field: keyof InterviewFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitForm = async (): Promise<PublishResponse> => {
    try {
      // Convert string fields to JSON objects before submitting
      const processedFormData = {
        ...formData,
        company_description: typeof formData.company_description === 'string' 
          ? { text: formData.company_description }
          : formData.company_description,
        job_description: typeof formData.job_description === 'string'
          ? { text: formData.job_description }
          : formData.job_description,
        applicant_resume: typeof formData.applicant_resume === 'string'
          ? { text: formData.applicant_resume }
          : formData.applicant_resume
      };

      const response = await fetch('/api/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedFormData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit interview');
      }

      const data = await response.json();
      return data as PublishResponse;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return (
    <InterviewFormContext.Provider value={{ formData, updateFormData, submitForm }}>
      {children}
    </InterviewFormContext.Provider>
  );
}

export function useInterviewForm() {
  const context = useContext(InterviewFormContext);
  if (context === undefined) {
    throw new Error('useInterviewForm must be used within an InterviewFormProvider');
  }
  return context;
}