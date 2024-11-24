import { Suspense } from 'react';
import { fetchJobPages, fetchJobs } from '@/app/actions/job-posting'
import JobPostingTable from './table';
import { TableSkeleton } from '@/app/ui/skeletons';

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { data: jobs } = await fetchJobs(query, currentPage);

  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <JobPostingTable jobPostings={jobs} />
      </Suspense>
      {jobs.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-400">No jobs found</p>
        </div>
      )}
    </div>
  );
}