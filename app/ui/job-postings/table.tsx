'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GenericTable, type Column, type Action } from '@/app/ui/table';
import { Job, Prisma } from '@prisma/client';
import Dialog from '@/app/ui/shared/dialog';
import { deleteJob, updateJob } from '@/app/actions/job-posting';
import JobPostingForm from './job_posting_form';

// Define the metadata type to match the structure we expect
type JobMetadata = {
  description: string;
};

// Update JobPostingTableItem to use the correct metadata type
type JobPostingTableItem = Omit<Job, 'metadata'> & {
  metadata: JobMetadata;
};

export default function JobPostingTable({ 
  jobPostings 
}: { 
  jobPostings: Array<Omit<Job, 'metadata'> & { metadata: Prisma.JsonValue }>
}) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobPostingToDelete, setJobPostingToDelete] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [jobPostingToEdit, setJobPostingToEdit] = useState<JobPostingTableItem | null>(null);

  const handleEditClick = (rawId: string) => {
    const id = parseInt(rawId, 10);
    const jobPosting = jobPostings.find(c => c.id === id);
    if (jobPosting) {
      // Type assertion to ensure metadata matches expected structure
      const formattedJobPosting: JobPostingTableItem = {
        ...jobPosting,
        metadata: jobPosting.metadata as JobMetadata
      };
      setJobPostingToEdit(formattedJobPosting);
      setEditModalOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    setJobPostingToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteWithId = async (prevState: any, formData: FormData) => {
    if (jobPostingToDelete) {
      formData.append('jobId', jobPostingToDelete);
    }
    
    const result = await deleteJob(prevState, formData);
    
    if (result.success) {
      setDeleteDialogOpen(false);
      setJobPostingToDelete(null);
      router.refresh();
    }
    
    return result;
  };

  const handleEditComplete = () => {
    setEditModalOpen(false);
    setJobPostingToEdit(null);
    router.refresh();
  };

  const columns: Column[] = [
    { key: 'position', label: 'Job Name' },
    { key: 'role', label: 'Job Role' },
    { key: 'type', label: 'Job Type' }
  ];

  const actions: Action[] = [
    { label: 'Edit', onClick: handleEditClick },
    { label: 'Delete', onClick: handleDeleteClick }
  ];

  return (
    <>
      <GenericTable 
        items={jobPostings}
        columns={columns}
        actions={actions}
      />
      
      {deleteDialogOpen && (
        <Dialog
          message="Are you sure you want to delete this job posting? This action cannot be undone."
          action={handleDeleteWithId}
          onClose={() => {
            setDeleteDialogOpen(false);
            setJobPostingToDelete(null);
          }}
          submitLabel="Delete"
          cancelLabel="Cancel"
        />
      )}

      {editModalOpen && jobPostingToEdit && (
        <JobPostingForm
          initialData={jobPostingToEdit}
          onClose={() => {
            setEditModalOpen(false);
            setJobPostingToEdit(null);
          }}
          onSuccess={handleEditComplete}
          mode="edit"
        />
      )}
    </>
  );
}