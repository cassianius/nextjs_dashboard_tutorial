'use client';

import React, { useState } from 'react';
import { useInterviewForm } from './InterviewFormContext';
import { AlertCircle } from 'lucide-react';
import { FocusArea } from './InterviewFormContext';

// Define the focus area descriptions
const FOCUS_AREAS: Record<FocusArea, { title: string; description: string }> = {
  [FocusArea.TECHNICAL_SKILLS]: {
    title: "Technical Skills",
    description: "Past roles, technologies used, project responsibilities, and depth of expertise in required skills."
  },
  [FocusArea.PROBLEM_SOLVING]: {
    title: "Problem Solving",
    description: "Challenging situations they've faced and how they worked through them. Look for structured thinking and resourcefulness."
  },
  [FocusArea.COMMUNICATION]: {
    title: "Communication",
    description: "Clarity, listening ability, and professionalism throughout the conversation. How well they explain technical concepts."
  },
  [FocusArea.ROLE_ALIGNMENT]: {
    title: "Role Alignment",
    description: "Their understanding of the position and interest. Ensure career goals and expectations match what's offered."
  },
  [FocusArea.CULTURAL_FIT]: {
    title: "Cultural Fit",
    description: "Assess cultural alignment and values through their responses and behaviors."
  },
  [FocusArea.LEADERSHIP]: {
    title: "Leadership",
    description: "Leadership experience, style, and approach to managing teams and projects."
  },
  [FocusArea.PROJECT_EXPERIENCE]: {
    title: "Project Experience",
    description: "Detailed exploration of past projects, contributions, and outcomes."
  },
  [FocusArea.SYSTEM_DESIGN]: {
    title: "System Design",
    description: "Ability to design scalable systems and make architectural decisions."
  },
  [FocusArea.CODE_QUALITY]: {
    title: "Code Quality",
    description: "Understanding of code quality principles, testing, and best practices."
  },
  [FocusArea.BEHAVIORAL]: {
    title: "Behavioral",
    description: "Past behavior patterns and responses to various workplace situations."
  },
  [FocusArea.TEAM_COLLABORATION]: {
    title: "Team Collaboration",
    description: "Experience with teamwork, handling feedback, and resolving conflicts."
  },
  [FocusArea.INITIATIVE]: {
    title: "Initiative",
    description: "Self-motivation, proactiveness, and ability to identify and solve problems independently."
  }
};

export const FocusAreasStep = () => {
  const { formData, updateFormData } = useInterviewForm();
  const [error, setError] = useState<string>('');

  const handleToggleFocusArea = (area: FocusArea) => {
    const currentAreas = formData.focus_areas || [];
    
    if (currentAreas.includes(area)) {
      // Remove area if already selected
      updateFormData('focus_areas', currentAreas.filter(a => a !== area));
      setError('');
    } else {
      // Add area if less than 4 are selected
      if (currentAreas.length >= 4) {
        setError('You can only select up to 4 focus areas');
        return;
      }
      updateFormData('focus_areas', [...currentAreas, area]);
      setError('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-white">Select Focus Areas</h2>
        <p className="text-gray-400">
          Choose up to 4 key areas that should be the primary focus of this interview.
          These will help guide the conversation and ensure all critical aspects are covered.
        </p>
        
        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(FOCUS_AREAS).map(([key, { title, description }]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleToggleFocusArea(key as FocusArea)}
              className={`text-left p-4 rounded-lg border ${
                formData.focus_areas?.includes(key as FocusArea)
                  ? 'border-blue-500 bg-blue-900/20'
                  : 'border-gray-700 bg-gray-900 hover:border-gray-600'
              } transition-colors`}
            >
              <h3 className="font-medium text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-400">{description}</p>
            </button>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          Selected: {formData.focus_areas?.length || 0} of 4 areas
        </div>
      </div>
    </div>
  );
};