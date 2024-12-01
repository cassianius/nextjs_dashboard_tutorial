import React, { Suspense } from 'react';
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/shared/pagination";
import { AddInterview } from "@/app/ui/interviews/buttons";
import InterviewsTable from "@/app/ui/interviews/list/table";
import LoadingIndicator from '@/app/ui/shared/loading-indicator';

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
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search interviews..." />
        <AddInterview />
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

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={1} />
      </div>
    </div>
  );
}