// app/ui/applicants/buttons.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import ApplicantForm from './applicant_form';

export function AddApplicant() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Button onClick={() => setShowForm(true)}>
        <UserPlusIcon className="h-4 w-4 mr-2" />
        Add Applicant
      </Button>

      {showForm && <ApplicantForm onClose={() => setShowForm(false)} />}
    </>
  );
}