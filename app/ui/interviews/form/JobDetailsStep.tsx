'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useInterviewForm } from './InterviewFormContext';
import { ChevronDown, Plus, Search, Check } from 'lucide-react';

type CompanySize = '1' | '10+' | '100+' | '1000+';

interface NewJobForm {
  company: string;
  website: string;
  headquarters: string;
  size: CompanySize | '';  // Allow empty string for initial state
  jobDescription: string;
}

const companySizes = [
  { label: '1 employee', value: '1' as CompanySize },
  { label: '10+ employees', value: '10+' as CompanySize },
  { label: '100+ employees', value: '100+' as CompanySize },
  { label: '1000+ employees', value: '1000+' as CompanySize },
] as const;

export const JobDetailsStep = () => {
  const { formData, updateFormData, jobs, addJob } = useInterviewForm();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewJobForm, setShowNewJobForm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const [newJob, setNewJob] = useState<NewJobForm>({
    company: '',
    website: '',
    headquarters: '',
    size: '',
    jobDescription: ''
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  const handleNewJobSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Add this line to prevent form submission
    
    if (newJob.size === '') return;
    
    const jobToAdd = {
      ...newJob,
      size: newJob.size as CompanySize
    };
    
    const job = addJob(jobToAdd);
    updateFormData('selectedJob', job);
    setShowNewJobForm(false);
    setNewJob({
      company: '',
      website: '',
      headquarters: '',
      size: '',
      jobDescription: ''
    });
  };

  const filteredJobs = jobs.filter(job =>
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400 hover:bg-gray-800 flex items-center justify-between"
          >
            <span className="truncate">
              {formData.selectedJob ? formData.selectedJob.company : "Select a job..."}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 rounded-md border border-gray-700 bg-gray-900 shadow-lg">
              <div className="flex items-center border-b border-gray-700 px-3 py-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search jobs..."
                  className="w-full bg-transparent px-2 text-sm text-white outline-none placeholder:text-gray-400"
                />
              </div>
              <div className="max-h-60 overflow-auto">
                {filteredJobs.length === 0 ? (
                  <div className="py-2 px-3 text-sm text-gray-400">
                    No jobs found.
                  </div>
                ) : (
                  filteredJobs.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => {
                        updateFormData('selectedJob', job);
                        setIsDropdownOpen(false);
                      }}
                      className="flex w-full items-center px-3 py-2 text-sm text-white hover:bg-gray-800"
                    >
                      <div className="w-4 mr-2">
                        {formData.selectedJob?.id === job.id && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                      {job.company}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowNewJobForm(true)}
          className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Job
        </button>
      </div>

      {showNewJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Add New Job</h3>
              <button
                onClick={() => setShowNewJobForm(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleNewJobSubmit} className="space-y-4">
              <div>
                <label className="mb-3 block text-xs font-medium text-white">
                  Company Name
                </label>
                <input
                  className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
                  placeholder="Enter company name"
                  value={newJob.company}
                  onChange={e => setNewJob({...newJob, company: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="mb-3 block text-xs font-medium text-white">
                  Website
                </label>
                <input
                  className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
                  placeholder="https://..."
                  value={newJob.website}
                  onChange={e => setNewJob({...newJob, website: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="mb-3 block text-xs font-medium text-white">
                  Headquarters Location
                </label>
                <input
                  className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
                  placeholder="City, Country"
                  value={newJob.headquarters}
                  onChange={e => setNewJob({...newJob, headquarters: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="mb-3 block text-xs font-medium text-white">
                  Company Size
                </label>
                <select
                  className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] px-3 text-sm outline-2"
                  value={newJob.size}
                  onChange={e => setNewJob({...newJob, size: e.target.value as CompanySize | ''})}
                  required
                >
                  <option value="">Select size...</option>
                  {companySizes.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-3 block text-xs font-medium text-white">
                  Job Description
                </label>
                <textarea
                  className="peer block w-full rounded-md text-white border border-gray-700 bg-gray-900 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
                  rows={4}
                  placeholder="Enter job description..."
                  value={newJob.jobDescription}
                  onChange={e => setNewJob({...newJob, jobDescription: e.target.value})}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewJobForm(false)}
                  className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {formData.selectedJob && (
        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white mb-2">Website</label>
              <p className="text-sm text-gray-400">{formData.selectedJob.website}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-2">Headquarters</label>
              <p className="text-sm text-gray-400">{formData.selectedJob.headquarters}</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-2">Company Size</label>
              <p className="text-sm text-gray-400">
                {companySizes.find(size => size.value === formData.selectedJob?.size)?.label}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-2">Job Description</label>
            <p className="text-sm text-gray-400 whitespace-pre-wrap">
              {formData.selectedJob.jobDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};