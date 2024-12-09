'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/app/ui/button';
import { CompanyDetailsStep } from './company_step';
import { JobDetailsStep } from './job_step';
import { ApplicantStep } from './applicant_step';
import { FocusAreasStep } from './focus_areas_step';
import { SettingsStep } from './settings_step';
import { PublishStep } from './publish_step';
import { useInterviewForm } from './form_context';

const MainWizard = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [validationError, setValidationError] = useState<string>('');
    const { formData } = useInterviewForm();

    const validateCompanyDetails = () => {
        if (!formData.company_name) {
            return 'Company name is required';
        }
        return null;
    };

    const validateJobDetails = () => {
        if (!formData.job_name) {
            return 'Job title is required';
        }
        if (!formData.job_description) {
            return 'Job description is required';
        }
        return null;
    };

    const validateApplicant = () => {
        if (!formData.applicants || formData.applicants.length === 0) {
            return 'At least one applicant is required';
        }
        return null;
    };

    const validateFocusAreas = () => {
        if (!formData.focus_areas || formData.focus_areas.length === 0) {
            return 'Please select at least one focus area';
        }
        if (formData.focus_areas.length > 4) {
            return 'Maximum of 4 focus areas allowed';
        }
        return null;
    };

    const validateSettings = () => {
        if (!formData.max_duration) {
            return 'Interview duration is required';
        }
        if (!formData.interviewer_style) {
            return 'Interviewer style is required';
        }
        if (!formData.sessionSettings?.expirationDays) {
            return 'Expiration period is required';
        }
        return null;
    };

    const steps = [
        {
            title: "Step 1 of 6",
            component: () => <CompanyDetailsStep />,
            validate: validateCompanyDetails
        },
        {
            title: "Step 2 of 6",
            component: () => <JobDetailsStep />,
            validate: validateJobDetails
        },
        {
            title: "Step 3 of 6",
            component: () => <ApplicantStep />,
            validate: validateApplicant
        },
        {
            title: "Step 4 of 6",
            component: () => <FocusAreasStep />,
            validate: validateFocusAreas
        },
        {
            title: "Step 5 of 6",
            component: () => <SettingsStep />,
            validate: validateSettings
        },
        {
            title: "Step 6 of 6",
            component: () => <PublishStep />,
            validate: () => null  // No validation needed for preview
        }
    ];

    const nextStep = () => {
        const error = steps[currentStep].validate();
        if (error) {
            setValidationError(error);
            return;
        }
        
        setValidationError('');
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setValidationError('');
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <form className="rounded-lg bg-gray-900 p-6" onSubmit={(e) => e.preventDefault()}>
            <div className="max-w-[600px] mx-auto">
                <div className="mb-8">
                    <div className="flex gap-1 mb-4 h-1">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className={`flex-1 rounded-full transition-colors ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-600'}`}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300">
                            {steps[currentStep].title}
                        </span>
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                onClick={() => prevStep()}
                                disabled={currentStep === 0}
                                className={currentStep === 0
                                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    : 'bg-gray-600 hover:bg-gray-500'
                                }
                            >
                                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                Previous
                            </Button>

                            {currentStep < steps.length - 1 && (
                                <Button
                                    type="button"
                                    onClick={() => nextStep()}
                                    className="bg-blue-600 hover:bg-blue-500"
                                >
                                    Next
                                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>
                    
                    {validationError && (
                        <div className="mt-4 flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded-md">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm">{validationError}</span>
                        </div>
                    )}
                </div>
                <div>
                    {steps[currentStep].component()}
                </div>
            </div>
        </form>
    );
};

export default MainWizard;