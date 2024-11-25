import { fetchApplicantPages } from "@/app/actions/applicant";
import Table from "@/app/ui/applicants";
import { lusitana } from "@/app/ui/fonts";
import { AddApplicant } from "@/app/ui/applicants/buttons";
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

  // Use separate function to get total pages
  const totalPages = await fetchApplicantPages(query);

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-4 md:mt-8">
        <Search placeholder="Search applicants..." />
        <AddApplicant />
      </div>
      <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}