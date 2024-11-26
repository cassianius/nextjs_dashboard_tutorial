// app/ui/topics/table.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GenericTable, type Column, type Action } from '@/app/ui/table';
import { Topic } from '@prisma/client';
import Dialog from '@/app/ui/shared/dialog';
import { deleteTopic } from '@/app/actions/topic';  // We'll need to add this action
import TopicForm from './topic_form';

export default function TopicTable({ 
  topics 
}: { 
  topics: Topic[]
}) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [topicToEdit, setTopicToEdit] = useState<Topic | null>(null);

  const handleEditClick = (id: string) => {
    const topic = topics.find(t => t.id === id);
    if (topic) {
      setTopicToEdit(topic);
      setEditModalOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    setTopicToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteWithId = async (prevState: any, formData: FormData) => {
    if (topicToDelete) {
      formData.append('id', topicToDelete);
      const result = await deleteTopic(prevState, formData);
      
      if (result.success) {
        setDeleteDialogOpen(false);
        setTopicToDelete(null);
        router.refresh();
      }
      
      return result;
    }
    
    return {
      message: null,
      errors: {
        _form: ['No topic selected for deletion']
      }
    };
  };

  const handleEditComplete = () => {
    setEditModalOpen(false);
    setTopicToEdit(null);
    router.refresh();
  };

  const columns: Column[] = [
    {
      key: 'topic',
      label: 'Category',
      render: (value: string) => 
        value.replace(/_/g, ' ').toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
    },
    {
      key: 'goal',
      label: 'Goal',
      render: (value: string) => 
        value.length > 100 ? `${value.slice(0, 97)}...` : value
    },
    {
      key: 'probe_level',
      label: 'Probe Level',
      render: (value: number) => {
        const labels = {
          1: '1 - Nice to have',
          2: '2',
          3: '3',
          4: '4',
          5: '5 - Must include'
        };
        return labels[value as keyof typeof labels] || value.toString();
      }
    }
  ];

  const actions: Action[] = [
    { 
      label: 'Edit', 
      onClick: handleEditClick,
    },
    { 
      label: 'Delete', 
      onClick: handleDeleteClick,
    }
  ];

  return (
    <>
      <GenericTable 
        items={topics}
        columns={columns}
        actions={actions}
      />
      
      {deleteDialogOpen && (
        <Dialog
          message="Are you sure you want to delete this topic? This action cannot be undone."
          action={handleDeleteWithId}
          onClose={() => {
            setDeleteDialogOpen(false);
            setTopicToDelete(null);
          }}
          submitLabel="Delete"
          cancelLabel="Cancel"
        />
      )}

      {editModalOpen && topicToEdit && (
        <TopicForm
          initialData={topicToEdit}
          onClose={() => {
            setEditModalOpen(false);
            setTopicToEdit(null);
          }}
          onSuccess={handleEditComplete}
          mode="edit"
        />
      )}
    </>
  );
}