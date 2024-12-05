'use client';

import { createInterview } from '@/app/actions/interview';
import { createApplicant } from '@/app/actions/applicant';
import { createSessionAccess } from '@/app/actions/sessionAccess';
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

interface Applicant {
  name: string;
  email: string;
  phone: string;
  resume?: string | Record<string, any>;
}

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

// Define session settings
interface SessionSettings {
  expirationDays: number;
}

// Define the shape of our form data based on the schema
export interface InterviewFormData {
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
  applicants: Applicant[];
  
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
  applicants: [],
  status: 'Draft',
  sessionSettings: {
    expirationDays: 7
  }
};

interface InterviewFormContextType {
  formData: InterviewFormData;
  updateFormData: (field: keyof InterviewFormData, value: any) => void;
  addApplicant: (applicant: Applicant) => void;
  removeApplicant: (index: number) => void;
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

  const addApplicant = (applicant: Applicant) => {
    setFormData(prev => ({
      ...prev,
      applicants: [...prev.applicants, applicant]
    }));
  };

  const removeApplicant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      applicants: prev.applicants.filter((_, i) => i !== index)
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
          : formData.job_description
      };
  
      // Create the interview first
      const interviewResponse = await createInterview(processedFormData);
  
      // Then create all applicants and their session access
      const applicantPromises = formData.applicants.map(async (applicant) => {
        const processedApplicant = {
          ...applicant,
          interview_id: interviewResponse.interview.id,
          resume: typeof applicant.resume === 'string'
            ? { text: applicant.resume }
            : applicant.resume
        };
        
        // Create applicant
        await createApplicant(processedApplicant);
        
        // Create session access for this applicant
        const sessionAccess = await createSessionAccess({
          interview_id: interviewResponse.interview.id,
          account_id: interviewResponse.interview.account_id,
          expiration_days: formData.sessionSettings.expirationDays
        });
  
        // Return combined applicant and session access info
        return {
          applicant_name: applicant.name,
          applicant_email: applicant.email,
          access_code: sessionAccess.access_code,
          pin: sessionAccess.pin,
          expiration: sessionAccess.expiration
        };
      });
  
      // Wait for all applicants and session access to be created
      const sessionAccessResults = await Promise.all(applicantPromises);
  
      // Return the properly structured response
      return {
        interview: interviewResponse.interview,
        sessionAccess: sessionAccessResults  // This is now guaranteed to be an array
      };
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return (
    <InterviewFormContext.Provider value={{ 
      formData, 
      updateFormData, 
      addApplicant, 
      removeApplicant, 
      submitForm 
    }}>
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