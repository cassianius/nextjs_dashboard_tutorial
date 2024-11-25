// app/ui/applicants/table.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GenericTable, type Column, type Action } from '@/app/ui/table';
import { Applicant, Prisma } from '@prisma/client';
import Dialog from '@/app/ui/shared/dialog';
import { deleteApplicant } from '@/app/actions/applicant';
import ApplicantForm from './applicant_form';

// Define the metadata type to match the structure we expect
type ApplicantMetadata = {
  resume: string;
};

// Update ApplicantTableItem to use the correct metadata type
type ApplicantTableItem = Omit<Applicant, 'metadata'> & {
  metadata: ApplicantMetadata;
};

export default function ApplicantTable({ 
  applicants 
}: { 
  applicants: Array<Omit<Applicant, 'metadata'> & { metadata: Prisma.JsonValue }>
}) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicantToDelete, setApplicantToDelete] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [applicantToEdit, setApplicantToEdit] = useState<ApplicantTableItem | null>(null);

  const handleEditClick = (rawId: string) => {
    const id = parseInt(rawId, 10);
    const applicant = applicants.find(a => a.id === id);
    if (applicant) {
      // Type assertion to ensure metadata matches expected structure
      const formattedApplicant: ApplicantTableItem = {
        ...applicant,
        metadata: applicant.metadata as ApplicantMetadata
      };
      setApplicantToEdit(formattedApplicant);
      setEditModalOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    setApplicantToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteWithId = async (prevState: any, formData: FormData) => {
    if (applicantToDelete) {
      formData.append('applicantId', applicantToDelete);
    }
    
    const result = await deleteApplicant(prevState, formData);
    
    if (result.success) {
      setDeleteDialogOpen(false);
      setApplicantToDelete(null);
      router.refresh();
    }
    
    return result;
  };

  const handleEditComplete = () => {
    setEditModalOpen(false);
    setApplicantToEdit(null);
    router.refresh();
  };

  const columns: Column[] = [
    { key: 'first', label: 'First Name' },
    { key: 'last', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' }
  ];

  const actions: Action[] = [
    { label: 'Edit', onClick: handleEditClick },
    { label: 'Delete', onClick: handleDeleteClick }
  ];

  return (
    <>
      <GenericTable 
        items={applicants}
        columns={columns}
        actions={actions}
      />
      
      {deleteDialogOpen && (
        <Dialog
          message="Are you sure you want to delete this applicant? This action cannot be undone."
          action={handleDeleteWithId}
          onClose={() => {
            setDeleteDialogOpen(false);
            setApplicantToDelete(null);
          }}
          submitLabel="Delete"
          cancelLabel="Cancel"
        />
      )}

      {editModalOpen && applicantToEdit && (
        <ApplicantForm
          initialData={applicantToEdit}
          onClose={() => {
            setEditModalOpen(false);
            setApplicantToEdit(null);
          }}
          onSuccess={handleEditComplete}
          mode="edit"
        />
      )}
    </>
  );
}