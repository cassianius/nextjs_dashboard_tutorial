'use client';

import React from 'react';
import { useInterviewForm } from './InterviewFormContext';
import { lusitana } from '../../fonts';
import { Button } from '@/app/ui/button';

export const PreviewStep = () => {
  const { formData, updateFormData } = useInterviewForm();

  return (
    <div className="max-w-[600px]">
      <div className="space-y-6">
        <h2 className={`${lusitana.className} text-lg font-semibold text-white`}>Preview Interview</h2>
        <div className="bg-gray-800 p-4 rounded-lg space-y-4 border border-gray-700">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-300">Call this number to test the interview:</p>
            <p className="text-xl text-white font-mono">+1 (555) 0123-4567</p>
            <p className="text-lg text-white font-mono">Access code: 1234</p>
          </div>
          <div className="pt-4 border-t border-gray-700">
            <Button className="w-full bg-blue-600 hover:bg-blue-500">
              Test Interview Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};