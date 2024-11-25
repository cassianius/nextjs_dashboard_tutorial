// app/ui/applicants/index.tsx
import { Suspense } from 'react';
import { fetchApplicants } from '@/app/actions/applicant';
import ApplicantTable from './table';
import { TableSkeleton } from '@/app/ui/skeletons';

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { data: applicants } = await fetchApplicants(query, currentPage);

  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <ApplicantTable applicants={applicants} />
      </Suspense>
      {applicants.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-400">No applicants found</p>
        </div>
      )}
    </div>
  );
}