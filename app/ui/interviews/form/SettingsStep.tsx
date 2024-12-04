'use client';

import React from 'react';
import { useInterviewForm } from './InterviewFormContext';

// First, let's update InterviewFormContext to include the session access expiration
interface SessionSettings {
  expirationDays: number;
}

// Add this to InterviewFormData interface in InterviewFormContext:
// sessionSettings: SessionSettings;

const DURATION_OPTIONS = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' }
] as const;

const INTERVIEWER_STYLES = [
  { value: 'Friendly', label: 'Friendly - Conversational and welcoming approach' },
  { value: 'Formal', label: 'Formal - Professional and structured approach' },
  { value: 'Probing', label: 'Probing - In-depth exploration of responses' }
] as const;

const EXPIRATION_DAYS = Array.from({ length: 14 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} ${i === 0 ? 'day' : 'days'}`
}));

export const SettingsStep = () => {
  const { formData, updateFormData } = useInterviewForm();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-white">Interview Settings</h2>
      <p className="text-gray-400">
        Configure the interview duration, style, and access settings.
      </p>

      <div className="space-y-6">
        <div>
          <label className="mb-3 block text-xs font-medium text-white">
            Interview Duration*
          </label>
          <select
            className="w-full rounded-md border border-gray-700 bg-gray-800 py-2 px-3 text-sm text-white outline-2 placeholder:text-gray-400"
            value={formData.max_duration}
            onChange={(e) => updateFormData('max_duration', parseInt(e.target.value))}
            required
          >
            <option value="">Select duration...</option>
            {DURATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-400">
            Choose how long the interview should take to complete.
          </p>
        </div>

        <div>
          <label className="mb-3 block text-xs font-medium text-white">
            Interviewer Style*
          </label>
          <select
            className="w-full rounded-md border border-gray-700 bg-gray-800 py-2 px-3 text-sm text-white outline-2 placeholder:text-gray-400"
            value={formData.interviewer_style}
            onChange={(e) => updateFormData('interviewer_style', e.target.value)}
            required
          >
            <option value="">Select style...</option>
            {INTERVIEWER_STYLES.map((style) => (
              <option key={style.value} value={style.value}>
                {style.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-400">
            Select the interviewing style that best matches your needs.
          </p>
        </div>

        <div>
          <label className="mb-3 block text-xs font-medium text-white">
            Access Expiration*
          </label>
          <select
            className="w-full rounded-md border border-gray-700 bg-gray-800 py-2 px-3 text-sm text-white outline-2 placeholder:text-gray-400"
            value={formData.sessionSettings?.expirationDays}
            onChange={(e) => updateFormData('sessionSettings', {
              ...formData.sessionSettings,
              expirationDays: parseInt(e.target.value)
            })}
            required
          >
            <option value="">Select expiration period...</option>
            {EXPIRATION_DAYS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-400">
            Choose how many days the interview access link will remain valid.
          </p>
        </div>
      </div>
    </div>
  );
};