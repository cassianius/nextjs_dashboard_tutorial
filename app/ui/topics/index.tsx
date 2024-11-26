// app/ui/topics/index.tsx
import { Topic } from '@prisma/client';
import TopicTable from './table';

export default function Table({
  query,
  currentPage,
  topics,
}: {
  query: string;
  currentPage: number;
  topics: Topic[];
}) {
  return (
    <div>
      <TopicTable topics={topics} />
      {topics.length === 0 && (
        <div className="text-center py-6">
          <p className="text-gray-400">No topics found</p>
        </div>
      )}
    </div>
  );
}