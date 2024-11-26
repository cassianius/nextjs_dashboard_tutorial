// app/topics/page.tsx
import { fetchTopicPages, fetchPaginatedTopics } from "@/app/actions/topic";
import Table from "@/app/ui/topics";
import { AddTopic } from "@/app/ui/topics/buttons";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/shared/pagination";
import { Suspense } from "react";
import { TableSkeleton } from "@/app/ui/skeletons";

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

  const totalPages = await fetchTopicPages(query);
  const { data } = await fetchPaginatedTopics(query, currentPage);

  // Ensure the data is serializable by picking only the fields we need
  const serializedTopics = data.map(topic => ({
    id: topic.id,
    topic: topic.topic,
    goal: topic.goal,
    probe_level: topic.probe_level,
    account_id: topic.account_id
  }));

  return (
    <div className="w-full">
      <div className="mt-4 flex items-center justify-between gap-4 md:mt-8">
        <Search placeholder="Search topics..." />
        <AddTopic />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <Table query={query} currentPage={currentPage} topics={serializedTopics} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}