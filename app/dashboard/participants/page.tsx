import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/participants/table";
import { AddParticipant } from "@/app/ui/participants/buttons";
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
  // const totalPages = await fetchParticipantsPages(query, currentPage);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl text-white`}>Participants</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search participants..." />
        <AddParticipant />
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
