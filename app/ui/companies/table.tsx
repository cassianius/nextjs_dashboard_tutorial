'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GenericTable, type Column, type Action } from '@/app/ui/table';
import { Company } from '@prisma/client';
import Dialog from '@/app/ui/shared/dialog';
import { deleteCompany, updateCompany } from '@/app/actions/company';
import CompanyForm from './company_form';

type CompanyTableItem = Pick<Company, 'id' | 'name' | 'industry' | 'headquarters' | 'size' | 'website'>;

export default function CompanyTable({ 
  companies 
}: { 
  companies: CompanyTableItem[]
}) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState<CompanyTableItem | null>(null);

  const handleEditClick = (id: string) => {
    const company = companies.find(c => c.id === id);
    if (company) {
      setCompanyToEdit(company);
      setEditModalOpen(true);
    }
  };

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
      router.refresh();
    }
    
    return result;
  };

  const handleEditComplete = () => {
    setEditModalOpen(false);
    setCompanyToEdit(null);
    router.refresh();
  };

  const columns: Column[] = [
    { key: 'name', label: 'Company Name' },
    { key: 'industry', label: 'Industry' },
    { key: 'headquarters', label: 'Location' }
  ];

  const actions: Action[] = [
    { label: 'Edit', onClick: handleEditClick },
    { label: 'Delete', onClick: handleDeleteClick }
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

      {editModalOpen && companyToEdit && (
        <CompanyForm
          initialData={companyToEdit}
          onClose={() => {
            setEditModalOpen(false);
            setCompanyToEdit(null);
          }}
          onSuccess={handleEditComplete}
          mode="edit"
        />
      )}
    </>
  );
}
