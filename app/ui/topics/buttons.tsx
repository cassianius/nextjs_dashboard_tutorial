// app/ui/topics/buttons.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import TopicForm from './topic_form';

export function AddTopic() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Button onClick={() => setShowForm(true)}>
        <DocumentPlusIcon className="h-4 w-4 mr-2" />
        Add Topic
      </Button>

      {showForm && <TopicForm onClose={() => setShowForm(false)} />}
    </>
  );
}