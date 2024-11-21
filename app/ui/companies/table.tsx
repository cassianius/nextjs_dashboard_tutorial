// app/ui/companies/table/companies-table.tsx
'use client';

import { useRouter } from 'next/navigation';
import { GenericTable, type Column, type Action } from '@/app/ui/table';
import { Company } from '@prisma/client';

type CompanyTableItem = Pick<Company, 'id' | 'name' | 'industry' | 'headquarters'>;

export default function CompanyTable({ 
  companies 
}: { 
  companies: CompanyTableItem[]
}) {
  const router = useRouter();

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
    }
  ];

  return (
    <GenericTable 
      items={companies}
      columns={columns}
      actions={actions}
    />
  );
}