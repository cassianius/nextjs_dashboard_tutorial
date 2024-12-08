'use client';

import React, { useState } from 'react';
import { Plus, X, Search, Check, UserPlus, Phone, Mail } from 'lucide-react';
import { useInterviewForm } from './InterviewFormContext';
import { useDebouncedCallback } from 'use-debounce';
import { searchApplicants, SearchApplicantResult } from '@/app/actions/applicant';
type DbApplicant = SearchApplicantResult;

interface ApplicantFormData {
  name: string;
  email: string;
  phone: string;
  resume: string; 
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  resume?: string;
}

export const ApplicantStep = () => {
  const { formData, addApplicant, removeApplicant } = useInterviewForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [dbApplicants, setDbApplicants] = useState<DbApplicant[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [applicantForm, setApplicantForm] = useState<ApplicantFormData>({
    name: '',
    email: '',
    phone: '',
    resume: ''
  });

  const handleSearch = useDebouncedCallback(async (query: string) => {
    if (!query.trim()) {
      setDbApplicants([]);
      return;
    }

    setIsLoading(true);
    setSearchError(null);

    try {
      const results = await searchApplicants(query);
      setDbApplicants(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Failed to search applicants. Please try again.');
      setDbApplicants([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!applicantForm.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!applicantForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(applicantForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!applicantForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!applicantForm.resume) {
      newErrors.resume = 'Resume is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setFormSubmitAttempted(true);

    if (validateForm()) {
      addApplicant(applicantForm);
      setApplicantForm({ name: '', email: '', phone: '', resume: '' });
      setFormSubmitAttempted(false);
      setErrors({});
      setIsModalOpen(false);
    }
  };

  const handleSelectExisting = (applicant: DbApplicant) => {
    const { id, ...applicantData } = applicant;
    addApplicant(applicantData);
    setSearchQuery('');
    setDbApplicants([]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormSubmitAttempted(false);
    setErrors({});
    setApplicantForm({ name: '', email: '', phone: '', resume: '' });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDbApplicants([]);
    setSearchError(null);
  };

  return (
    <div className="space-y-6">
      <div>
        {/* Search Bar Section */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-2.5 h-4 w-4 transition-colors ${searchFocused ? 'text-blue-400' : 'text-gray-400'
              }`} />
            <input
              type="text"
              placeholder="Search existing applicants..."
              className="w-full pl-9 rounded-t-md text-white border border-gray-700 bg-gray-800 py-[9px] px-3 text-sm 
                outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60
                placeholder:text-gray-400"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Search Results - Now directly under search bar */}
            {searchQuery && (
              <div className="absolute w-full bg-gray-800 border-x border-b border-gray-700 rounded-b-md shadow-lg">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-400">
                    Searching...
                  </div>
                ) : searchError ? (
                  <div className="p-4 text-center text-red-400">
                    {searchError}
                  </div>
                ) : dbApplicants.length > 0 ? (
                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-700">
                    {dbApplicants.map((applicant) => (
                      <button
                        key={applicant.id}
                        onClick={() => handleSelectExisting(applicant)}
                        className="w-full text-left p-3 hover:bg-gray-700/50 flex flex-col gap-1"
                      >
                        <span className="text-white font-medium">{applicant.name}</span>
                        <div className="flex gap-4 text-sm">
                          <span className="text-gray-400 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {applicant.email}
                          </span>
                          {applicant.phone && (
                            <span className="text-gray-400 flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {applicant.phone}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-400">
                    No matching applicants found
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm"
          >
            <UserPlus className="h-4 w-4" />
            Add New
          </button>
        </div>

        {/* Selected Applicants Title */}
        <div className="mt-8 mb-4">
          <h3 className="text-sm font-medium text-gray-300">Selected Applicants</h3>
        </div>

        {/* Selected Applicants List */}
        <div className="space-y-2 bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          {formData.applicants.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-4">
              No applicants selected yet
            </p>
          ) : (
            formData.applicants.map((applicant, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 rounded-md border border-gray-700 bg-gray-800 hover:border-gray-600 transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <p className="text-white text-sm font-medium">{applicant.name}</p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Mail className="h-3 w-3" />
                      <span className="text-sm">{applicant.email}</span>
                    </div>
                    {applicant.phone && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <Phone className="h-3 w-3" />
                        <span className="text-sm">{applicant.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeApplicant(index)}
                  className="text-gray-400 hover:text-red-400 p-1"
                  title="Remove applicant"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>


      {/* Add Applicant Modal - remains unchanged */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-white">Add New Applicant</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-white">
                  Full Name*
                </label>
                <input
                  className="w-full rounded-md text-white border border-gray-700 bg-gray-800 py-2 px-3 text-sm outline-2 placeholder:text-gray-400"
                  placeholder="Enter applicant's full name"
                  value={applicantForm.name}
                  onChange={e => setApplicantForm({ ...applicantForm, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-white">
                  Email Address*
                </label>
                <input
                  type="email"
                  className="w-full rounded-md text-white border border-gray-700 bg-gray-800 py-2 px-3 text-sm outline-2 placeholder:text-gray-400"
                  placeholder="email@example.com"
                  value={applicantForm.email}
                  onChange={e => setApplicantForm({ ...applicantForm, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-white">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  className="w-full rounded-md text-white border border-gray-700 bg-gray-800 py-2 px-3 text-sm outline-2 placeholder:text-gray-400"
                  placeholder="+1 (555) 000-0000"
                  value={applicantForm.phone}
                  onChange={e => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-white">
                  Resume*
                </label>
                <textarea
                  className="w-full rounded-md text-white border border-gray-700 bg-gray-800 py-2 px-3 text-sm outline-2 placeholder:text-gray-400"
                  placeholder="Paste the applicant's resume text here..."
                  rows={6}
                  value={applicantForm.resume}
                  onChange={e => setApplicantForm({ ...applicantForm, resume: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm"
                >
                  <Check className="h-4 w-4" />
                  Add Applicant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};