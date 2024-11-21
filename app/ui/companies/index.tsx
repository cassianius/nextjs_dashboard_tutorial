import { Suspense } from 'react';
import { fetchCompanies } from '@/app/actions/company'
import CompaniesTable from './table';
import { TableSkeleton } from '@/app/ui/skeletons';

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { data: companies } = await fetchCompanies(query, currentPage);

  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <CompaniesTable companies={companies} />
      </Suspense>
      {companies.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-400">No companies found</p>
        </div>
      )}
    </div>
  );
}