
'use client';

import React, { useState } from 'react';
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useInterviewForm } from './InterviewFormContext';

const [generatedQuestions, setGeneratedQuestions] = useState(['']);

  const addQuestion = () => {
    if (generatedQuestions.length < 10) {
      setGeneratedQuestions([...generatedQuestions, '']);
    }
  };

  const removeQuestion = (index: number) => {
    if (generatedQuestions.length > 1) {
      const newQuestions = generatedQuestions.filter((_, i) => i !== index);
      setGeneratedQuestions(newQuestions);
    }
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...generatedQuestions];
    newQuestions[index] = value;
    setGeneratedQuestions(newQuestions);
  };

export const QuestionsStep = () => {
  const { formData, updateFormData } = useInterviewForm();

  return  (
    <div className="max-w-[600px]">
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className="mb-3 mt-5 block text-xs font-medium text-white">
            Interview Questions
          </label>
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            <PlusCircleIcon className="h-4 w-4 mr-1" />
            Add Question
          </button>
        </div>

        <Button
          className="w-full mb-4 bg-blue-600 hover:bg-blue-500"
          onClick={() => console.log('Generate questions')}
        >
          Generate Questions
        </Button>

        <div className="space-y-2">
          {generatedQuestions.map((question, index) => (
            <div key={index} className="relative flex items-center gap-2">
              <div className="flex-grow">
                <input
                  className="peer block w-full rounded-md text-white border bg-gray-900 py-[9px] text-sm outline-2 placeholder:text-gray-400"
                  type="text"
                  value={question}
                  onChange={(e) => updateQuestion(index, e.target.value)}
                  placeholder={`Question ${index + 1}`}
                  required
                />
              </div>
              {generatedQuestions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Add up to 10 interview questions
        </p>
      </div>
    </div>
  )
};