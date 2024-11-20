import Pagination from "@/app/ui/shared/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/applicants/table";
import { AddApplicant } from "@/app/ui/applicants/buttons";
import { lusitana } from "@/app/ui/fonts";
// import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

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
  // const totalPages = await fetchApplicantsPages(query, currentPage);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl text-white`}>Applicants</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search applicants..." />
        <AddApplicant />
      </div>
      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
       <Table query={query} currentPage={currentPage} /> 
       {/* <Table/> */}
      {/* </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={2} />
      </div>
    </div>
  );
}
