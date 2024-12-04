'use client';

import React, { useState } from 'react';
import { Plus, X, Search, Check } from 'lucide-react';
import { useInterviewForm } from './InterviewFormContext';

interface ApplicantFormData {
  name: string;
  email: string;
  phone: string;
  resume: string;
}

export const ApplicantStep = () => {
  const { formData, addApplicant, removeApplicant } = useInterviewForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [applicantForm, setApplicantForm] = useState<ApplicantFormData>({
    name: '',
    email: '',
    phone: '',
    resume: ''
  });

  const handleSubmit = () => {
    addApplicant(applicantForm);
    setApplicantForm({ name: '', email: '', phone: '', resume: '' });
    setIsModalOpen(false);
  };

  const handleRemove = (index: number) => {
    removeApplicant(index);
  };

  const filteredApplicants = formData.applicants.filter(applicant =>
    applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    applicant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Applicant Search and Add Section */}
      <div className="relative">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search applicants..."
              className="w-full pl-9 rounded-md text-white border border-gray-700 bg-gray-800 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm"
          >
            <Plus className="h-4 w-4" />
            Add Applicant
          </button>
        </div>

        {/* Selected Applicants List */}
        <div className="space-y-2">
          {filteredApplicants.map((applicant, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 rounded-md border border-gray-700 bg-gray-800"
            >
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{applicant.name}</p>
                <p className="text-gray-400 text-sm">{applicant.email}</p>
              </div>
              <button
                onClick={() => handleRemove(index)}
                className="text-gray-400 hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Applicant Modal */}
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
                  onChange={e => setApplicantForm({...applicantForm, name: e.target.value})}
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
                  onChange={e => setApplicantForm({...applicantForm, email: e.target.value})}
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
                  onChange={e => setApplicantForm({...applicantForm, phone: e.target.value})}
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
                  onChange={e => setApplicantForm({...applicantForm, resume: e.target.value})}
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