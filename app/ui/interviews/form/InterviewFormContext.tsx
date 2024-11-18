'use client';

import React, { createContext, useContext, useState } from 'react';

// Define the job interface
interface Job {
  id: string;
  company: string;
  website: string;
  headquarters: string;
  size: '1' | '10+' | '100+' | '1000+';
  jobDescription: string;
}

// Define the shape of our form data
interface InterviewFormData {
  selectedJob?: Job;
  roleCategory: string;
  interviewDuration: string;
  interviewStyle: string;
  
  // Applicant
  applicantEmail: string;
  resumeFile?: File;
  
  // Questions
  questions: string[];
  
  // Publish
  expiryDate: string;
  emailTemplate: string;
}

// Default values
const defaultFormData: InterviewFormData = {
  roleCategory: '',
  interviewDuration: '30 minutes',
  interviewStyle: 'Friendly',
  applicantEmail: '',
  questions: [''],
  expiryDate: '',
  emailTemplate: `Dear [Applicant],

Please complete your phone interview by calling +1 (555) 0123-4567 and entering access code: 1234

The interview will take approximately [duration] minutes. Please complete it by [expiry date].

Best regards,
[Company Name]`
};

interface InterviewFormContextType {
  formData: InterviewFormData;
  updateFormData: (field: keyof InterviewFormData, value: any) => void;
  submitForm: () => Promise<void>;
  jobs: Job[];
  addJob: (newJob: Omit<Job, 'id'>) => Job;
}

const InterviewFormContext = createContext<InterviewFormContextType | undefined>(undefined);

export function InterviewFormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<InterviewFormData>(defaultFormData);
  const [jobs, setJobs] = useState<Job[]>([]);

  const updateFormData = (field: keyof InterviewFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addJob = (newJob: Omit<Job, 'id'>) => {
    const job: Job = {
      ...newJob,
      id: crypto.randomUUID()
    };
    setJobs(prev => [...prev, job]);
    return job;
  };

  const submitForm = async () => {
    try {
      const response = await fetch('/api/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit interview');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return (
    <InterviewFormContext.Provider value={{ formData, updateFormData, submitForm, jobs, addJob }}>
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