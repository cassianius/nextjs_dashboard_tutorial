import { TableRowMobile } from "./table_row_mobile";
import { FormattedInterviewsTable } from "@/app/lib/definitions";
import { TableHeader } from "./table_header";
import { TableRow } from "./table_row";
import { fetchInterviews } from "@/app/lib/actions/fetch/fetchInterviews";

const InterviewsTable = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  
  const interviews = await fetchInterviews(query, currentPage) as FormattedInterviewsTable[];

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">
      {/* Mobile view */}
      <div className="md:hidden">
        {interviews?.map((interview) => (
          <TableRowMobile key={interview.id} interview={interview} />
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full">
          <TableHeader />
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {interviews?.map((interview) => (
              <TableRow key={interview.id} interview={interview} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewsTable;