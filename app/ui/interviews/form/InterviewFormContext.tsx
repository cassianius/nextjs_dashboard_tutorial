'use client';

import React, { createContext, useContext, useState } from 'react';

// Define the shape of our form data
interface InterviewFormData {
  // Job Details
  jobDescription: string;
  company: string;
  roleCategory: string;
  interviewDuration: string;
  interviewStyle: string;
  
  // Candidate
  candidateEmail: string;
  resumeFile?: File;
  
  // Questions
  questions: string[];
  
  // Publish
  expiryDate: string;
  emailTemplate: string;
}

// Default values
const defaultFormData: InterviewFormData = {
  jobDescription: '',
  company: '',
  roleCategory: '',
  interviewDuration: '30 minutes',
  interviewStyle: 'Friendly',
  candidateEmail: '',
  questions: [''],
  expiryDate: '',
  emailTemplate: `Dear [Candidate],

Please complete your phone interview by calling +1 (555) 0123-4567 and entering access code: 1234

The interview will take approximately [duration] minutes. Please complete it by [expiry date].

Best regards,
[Company Name]`
};

interface InterviewFormContextType {
  formData: InterviewFormData;
  updateFormData: (field: keyof InterviewFormData, value: any) => void;
  submitForm: () => Promise<void>;
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

  const submitForm = async () => {
    try {
      // Here you would make your API call to save the data
      // For Next.js, you might want to use the route handlers
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