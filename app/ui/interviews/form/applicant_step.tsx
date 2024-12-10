'use client';

import React, { useState } from 'react';
import { X, Check, UserPlus, Phone, Mail } from 'lucide-react';
import { useInterviewForm } from './form_context';

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
  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [applicantForm, setApplicantForm] = useState<ApplicantFormData>({
    name: '',
    email: '',
    phone: '',
    resume: ''
  });

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Truncate to 10 digits if longer
    const truncated = digits.slice(0, 10);
    
    // Format as (XXX) XXX-XXXX
    if (truncated.length === 0) return '';
    if (truncated.length <= 3) return `(${truncated}`;
    if (truncated.length <= 6) return `(${truncated.slice(0, 3)}) ${truncated.slice(3)}`;
    return `(${truncated.slice(0, 3)}) ${truncated.slice(3, 6)}-${truncated.slice(6)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setApplicantForm(prev => ({ ...prev, phone: formatted }));
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
    } else if (applicantForm.phone.replace(/\D/g, '').length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormSubmitAttempted(false);
    setErrors({});
    setApplicantForm({ name: '', email: '', phone: '', resume: '' });
  };

  const addButtonStyles = `
    w-full rounded-lg border border-dashed border-gray-700 hover:border-blue-500 
    transition-colors group py-3 flex items-center justify-center gap-2
    text-gray-400 hover:text-blue-400 text-sm
  `;

  return (
    <div className="space-y-6">
      <div>
        {/* Title */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-300">Applicants</h3>
        </div>

        {formData.applicants.length === 0 ? (
          // Large Add Button with Dashed Border
          <button
            onClick={() => setIsModalOpen(true)}
            className={addButtonStyles}
          >
            <UserPlus className="h-4 w-4" />
            Add Your First Applicant
          </button>
        ) : (
          // Applicants List with Add Button
          <div className="space-y-4">
            <div className="space-y-2 bg-gray-900/50 rounded-lg p-4 border border-gray-800">
              {formData.applicants.map((applicant, index) => (
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
                      <div className="flex items-center gap-1 text-gray-400">
                        <Phone className="h-3 w-3" />
                        <span className="text-sm">{formatPhoneNumber(applicant.phone)}</span>
                      </div>
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
              ))}
            </div>
            
            {/* Add Another Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className={addButtonStyles}
            >
              <UserPlus className="h-4 w-4" />
              Add Another Applicant
            </button>
          </div>
        )}
      </div>

      {/* Add Applicant Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-white">Add New Applicant</h3>
              <button
                onClick={handleCloseModal}
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
                {formSubmitAttempted && errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                )}
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
                {formSubmitAttempted && errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-white">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  className="w-full rounded-md text-white border border-gray-700 bg-gray-800 py-2 px-3 text-sm outline-2 placeholder:text-gray-400"
                  placeholder="(555) 555-5555"
                  value={applicantForm.phone}
                  onChange={handlePhoneChange}
                  maxLength={14}
                  required
                />
                {formSubmitAttempted && errors.phone && (
                  <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                )}
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
                {formSubmitAttempted && errors.resume && (
                  <p className="mt-1 text-xs text-red-400">{errors.resume}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleCloseModal}
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