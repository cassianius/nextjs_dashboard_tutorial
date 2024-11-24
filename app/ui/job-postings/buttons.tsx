// app/ui/companies/buttons.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import JobPostingForm from './job_posting_form';

export function AddJobPosting() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Button onClick={() => setShowForm(true)}>
        <BuildingOffice2Icon className="h-4 w-4 mr-2" />
        Add Job Posting
      </Button>

      {showForm && <JobPostingForm onClose={() => setShowForm(false)} />}
    </>
  );
}