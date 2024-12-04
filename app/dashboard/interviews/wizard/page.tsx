'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/app/ui/shared/breadcrumbs';
import MainWizard from '@/app/ui/interviews/form/MainWizard';
import { InterviewFormProvider } from '@/app/ui/interviews/form/InterviewFormContext';

const StepWizard = () => {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Interviews', href: '/dashboard/interviews' },
          {
            label: 'Create Interview',
            href: '/dashboard/interviews/create',
            active: true,
          },
        ]}
      />
      <InterviewFormProvider>
        <MainWizard />
      </InterviewFormProvider>
    </main>
  );
};

export default StepWizard;