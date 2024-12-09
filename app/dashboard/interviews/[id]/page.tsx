// app/interviews/[id]/page.tsx
import { Suspense } from 'react';
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { UserPlus } from 'lucide-react';
import Pagination from "@/app/ui/shared/pagination";
import LoadingIndicator from '@/app/ui/shared/loading-indicator';
import { notFound } from 'next/navigation';
import { fetchApplicantsByInterview } from '@/app/actions/applicant';
import { InterviewDetail, fetchInterviewById } from '@/app/actions/interview';
import { ApplicantTableHeader } from '@/app/ui/interviews/detail/table_header';
import { ApplicantTableRow } from '@/app/ui/interviews/detail/table_row';
import { InterviewSummary } from '@/app/ui/interviews/detail/summary';
import Breadcrumbs from '@/app/ui/shared/breadcrumbs';

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const interviewId = parseInt(params.id);

  let interview: InterviewDetail;
  try {
    interview = await fetchInterviewById(interviewId);
  } catch (error) {
    console.error('Failed to fetch interview:', error);
    notFound();
  }

  const { applicants, total } = await fetchApplicantsByInterview(interviewId, {
    q: query,
    page: currentPage.toString(),
    pageSize: '10'
  });

  return (
    <div className="w-full">
        <Breadcrumbs
        breadcrumbs={[
          { label: 'Interviews', href: '/dashboard/interviews' },
          {
            label: 'Interview Details',
            href: '',
            active: true
          },
        ]}
      />
      <div className="mb-8">
        <InterviewSummary interview={interview} />
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className={`${lusitana.className} text-2xl text-white`}>Applicants</h2>
          <div className="flex items-center gap-4">
            <Search placeholder="Search applicants..." />
            <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-sm">
              <UserPlus className="h-4 w-4" />
              Add Applicant
            </button>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="relative">
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingIndicator />
              </div>
            }>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <ApplicantTableHeader />
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {applicants.map((applicant) => (
                      <ApplicantTableRow key={applicant.id} applicant={applicant} />
                    ))}
                  </tbody>
                </table>
              </div>
            </Suspense>
          </div>
        </div>
        {total > 10 && (
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={Math.ceil(total / 10)} />
          </div>
        )}
      </div>
    </div>
  );
}