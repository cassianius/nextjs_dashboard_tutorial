// app/dashboard/companies/page.tsx
import { fetchCompanyPages } from "@/app/actions/company";
import Table from "@/app/ui/companies";
import { AddCompany } from "@/app/ui/companies/buttons";
import { lusitana } from "@/app/ui/fonts";
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
  const totalPages = await fetchCompanyPages(query)
  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-4 md:mt-8">
        <Search placeholder="Search companies..." />
        <AddCompany />
      </div>
      <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}