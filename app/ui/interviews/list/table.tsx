import { TableRowMobile } from "./table_row_mobile";
import { TableHeader } from "./table_header";
import { TableRow } from "./table_row";
import { getInterviews } from "@/app/actions/interview";

interface InterviewsTableProps {
  query: string;
  currentPage: number;
}

const InterviewsTable = async ({ query, currentPage }: InterviewsTableProps) => {
  const { interviews } = await getInterviews({
    q: query,
    page: currentPage.toString(),
    pageSize: '10'
  });

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
      {/* Mobile view */}
      <div className="md:hidden">
        {interviews.map((interview) => (
          <TableRowMobile key={interview.id} interview={interview} />
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full">
          <TableHeader />
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {interviews.map((interview) => (
              <TableRow key={interview.id} interview={interview} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewsTable;