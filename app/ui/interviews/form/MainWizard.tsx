'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { JobDetailsStep } from './JobDetailsStep';
import { CandidateStep } from './CandidateStep';
import { QuestionsStep } from './QuestionsStep';
import { PreviewStep } from './PreviewStep';
import { PublishStep } from './PublishStep';

const MainWizard = () => {

    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Step 1 of 5",
            component: () => <JobDetailsStep />
        },
        {
            title: "Step 2 of 5",
            component: () => <CandidateStep />
        },
        {
            title: "Step 3 of 5",
            component: () => <QuestionsStep />
        },
        {
            title: "Step 4 of 5",
            component: () => <PreviewStep />
        },
        {
            title: "Step 5 of 5",
            component: () => <PublishStep />
        }
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <form className="rounded-lg bg-gray-900 p-6">
            <div className="max-w-[600px] mx-auto">
                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex gap-1 mb-4 h-1">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className={`flex-1 rounded-full transition-colors ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-600'
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between items-center">
                        <span className=" text-gray-300">
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

                            {currentStep < steps.length - 1 ? (
                                <Button
                                    type="button"
                                    onClick={() => nextStep()}
                                    className="bg-blue-600 hover:bg-blue-500"
                                >
                                    Next
                                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-500"
                                >
                                    <RocketLaunchIcon className="h-4 w-4 mr-2" />
                                    Publish
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    {steps[currentStep].component()}
                </div>
            </div>
        </form>
    );
};

export default MainWizard;