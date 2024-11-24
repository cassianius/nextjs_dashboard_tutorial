// app/dashboard/companies/page.tsx
import { fetchJobPages, fetchJobs } from "@/app/actions/job-posting";
import Table from "@/app/ui/job-postings";
import { lusitana } from "@/app/ui/fonts";
import { AddJobPosting } from "@/app/ui/job-postings/buttons";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/shared/pagination";

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
  const totalPages = await fetchJobPages(query)
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-4 md:mt-8">
        <Search placeholder="Search job postings..." />
        <AddJobPosting />
      </div>
      <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}