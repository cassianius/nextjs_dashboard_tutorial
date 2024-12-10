// app/interviews/[id]/client-toast.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  ToastProvider, 
  Toast, 
  ToastTitle, 
  ToastDescription, 
  ToastViewport, 
  ToastClose 
} from '@/app/ui/shared/toast';

export function ClientToast({ show }: { show: boolean }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (show) {
      setShowToast(true);
    }
  }, [show]);

  return (
    <ToastProvider>
      {showToast && (
        <Toast>
          <div>
            <ToastTitle>Success!</ToastTitle>
            <ToastDescription>
              Interview successfully published
            </ToastDescription>
          </div>
          <ToastClose onClick={() => setShowToast(false)} />
        </Toast>
      )}
      <ToastViewport />
    </ToastProvider>
  );
}