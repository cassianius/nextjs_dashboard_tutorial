import React, { Suspense } from 'react';
import { Users, Briefcase, UserCircle, BookOpen, Building2 } from 'lucide-react';
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/shared/pagination";
import { AddInterview } from "@/app/ui/interviews/buttons";
import { AddJobPosting } from "@/app/ui/job-postings/buttons";
import { AddApplicant } from "@/app/ui/applicants/buttons";
import { AddTopic } from "@/app/ui/topics/buttons";
import { AddCompany } from "@/app/ui/companies/buttons";
import InterviewsTable from "@/app/ui/interviews/list/table";
import JobPostingsTable from "@/app/ui/job-postings";
import ApplicantsTable from "@/app/ui/applicants";
import TopicsTable from "@/app/ui/topics";
import CompaniesTable from "@/app/ui/companies";
import LoadingIndicator from '@/app/ui/shared/loading-indicator';

const tabs = [
  { id: 'interviews', label: 'Interviews', icon: Users, 
    addButton: AddInterview, placeholder: "Search interviews...",
    table: InterviewsTable },
  { id: 'jobs', label: 'Job Postings', icon: Briefcase,
    addButton: AddJobPosting, placeholder: "Search job postings...",
    table: JobPostingsTable },
  { id: 'applicants', label: 'Applicants', icon: UserCircle,
    addButton: AddApplicant, placeholder: "Search applicants...",
    table: ApplicantsTable },
  { id: 'companies', label: 'Companies', icon: Building2,
    addButton: AddCompany, placeholder: "Search companies...",
    table: CompaniesTable },
  { id: 'topics', label: 'Topics', icon: BookOpen,
    addButton: AddTopic, placeholder: "Search topics...",
    table: TopicsTable }
];

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    tab?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const activeTab = searchParams?.tab || 'interviews';

  const TabContent = tabs.find(tab => tab.id === activeTab)?.table || tabs[0].table;
  const AddButton = tabs.find(tab => tab.id === activeTab)?.addButton || tabs[0].addButton;
  const searchPlaceholder = tabs.find(tab => tab.id === activeTab)?.placeholder || "";

  return (
    <div className="w-full">
      <div className="relative">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <div className="flex space-x-1 border-b border-gray-700 min-w-max">
            {tabs.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <a
                  key={id}
                  href={`?tab=${id}&query=${query}&page=${currentPage}`}
                  className={`
                    flex items-center space-x-2 px-4 py-2 text-sm font-medium
                    transition-colors duration-150 ease-in-out
                    ${isActive 
                      ? 'border-b-2 border-white text-white' 
                      : 'text-gray-400 hover:text-gray-300 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={searchPlaceholder} />
        <AddButton />
      </div>

      <div className="relative min-h-[400px]">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingIndicator />
          </div>
        }>
          <TabContent query={query} currentPage={currentPage} topics={[]} />
        </Suspense>
      </div>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={1} />
      </div>
    </div>
  );
}