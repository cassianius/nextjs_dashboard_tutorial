// app/ui/companies/buttons.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import CompanyForm from '../companies/company_form'

export function AddCompany() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Button onClick={() => setShowForm(true)}>
        <BuildingOffice2Icon className="h-4 w-4 mr-2" />
        Add Company
      </Button>

      {showForm && <CompanyForm onClose={() => setShowForm(false)} />}
    </>
  );
}