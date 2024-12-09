// page.tsx
import React, { Suspense } from 'react';
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/shared/pagination";
import { AddInterview } from "@/app/ui/interviews/buttons";
import InterviewsTable from "@/app/ui/interviews/list/table";
import LoadingIndicator from '@/app/ui/shared/loading-indicator';
import { getInterviews } from '@/app/actions/interview';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">


<div className="flex items-center justify-between">
          <h2 className={`${lusitana.className} text-2xl text-white`}>Interviews</h2>
          <div className="flex items-center gap-4">
            <Search placeholder="Search interviews..." />
            <AddInterview />
          </div>
        </div>
      <div className="relative min-h-[400px]">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingIndicator />
          </div>
        }>
          <InterviewsTable query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <Suspense>
        <PaginationWrapper query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}

// New component to handle pagination logic
async function PaginationWrapper({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { total } = await getInterviews({ q: query, page: currentPage.toString(), pageSize: '10' });
  const totalPages = Math.ceil(total / 10);
  
  if (total <= 10) return null;

  return (
    <div className="mt-5 flex w-full justify-center">
      <Pagination totalPages={totalPages} />
    </div>
  );
}