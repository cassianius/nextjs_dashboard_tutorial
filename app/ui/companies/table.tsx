// app/ui/companies/table/companies-table.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GenericTable, type Column, type Action } from '@/app/ui/table';
import { Company } from '@prisma/client';
import Dialog from '@/app/ui/shared/dialog';
import { deleteCompany } from '@/app/actions/company';

type CompanyTableItem = Pick<Company, 'id' | 'name' | 'industry' | 'headquarters'>;

export default function CompanyTable({ 
  companies 
}: { 
  companies: CompanyTableItem[]
}) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setCompanyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteWithId = async (prevState: any, formData: FormData) => {
    if (companyToDelete) {
      formData.append('companyId', companyToDelete.toString());
    }
    
    const result = await deleteCompany(prevState, formData);
    
    if (result.success) {
      setDeleteDialogOpen(false);
      setCompanyToDelete(null);
      router.refresh(); // Refresh the table data
    }
    
    return result;
  };

  const columns: Column[] = [
    { 
      key: 'name', 
      label: 'Company Name',
    },
    { 
      key: 'industry', 
      label: 'Industry' 
    },
    { 
      key: 'headquarters', 
      label: 'Location' 
    }
  ];

  const actions: Action[] = [
    {
      label: 'Edit',
      onClick: (id) => router.push(`/dashboard/companies/${id}/edit`)
    },
    {
      label: 'View',
      onClick: (id) => router.push(`/dashboard/companies/${id}`)
    },
    {
      label: 'Delete',
      onClick: handleDeleteClick
    }
  ];

  return (
    <>
      <GenericTable 
        items={companies}
        columns={columns}
        actions={actions}
      />
      
      {deleteDialogOpen && (
        <Dialog
          message="Are you sure you want to delete this company? This action cannot be undone."
          action={handleDeleteWithId}
          onClose={() => {
            setDeleteDialogOpen(false);
            setCompanyToDelete(null);
          }}
          submitLabel="Delete"
          cancelLabel="Cancel"
        />
      )}
    </>
  );
}