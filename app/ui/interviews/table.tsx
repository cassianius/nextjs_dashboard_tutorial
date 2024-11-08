import Link from 'next/link';
import { FormattedInterviewsTable } from '@/app/lib/definitions';
import { fetchInterviews, fetchInterviewPages } from '@/app/lib/actions';

export default async function InterviewsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const interviews = await fetchInterviews(query, currentPage) as FormattedInterviewsTable[];
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-900 text-green-200';
      case 'inactive':
        return 'bg-gray-700 text-gray-200';
      case 'draft':
        return 'bg-yellow-700 text-gray-200';
      default:
        return 'bg-gray-700 text-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">

      {/* Mobile view */}
      <div className="md:hidden">
        {interviews?.map((interview) => (
          <div
            key={interview.id}
            className="mb-4 p-4 bg-gray-700 rounded-lg"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">{interview.topic}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(interview.status)}`}>
                  {formatStatus(interview.status)}
                </span>
              </div>
              <p className="text-gray-300 text-sm">{interview.date}</p>
              <div className="pt-2 flex justify-end space-x-4">
                <Link
                  href={`/interviews/${interview.id}`}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View
                </Link>


                {interview.status === "draft" && (
                  <Link
                    href={`/interviews/${interview.id}/edit`}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Edit
                  </Link>
                )}

                {interview.status === "published" && (
                  <Link
                    href={`/interviews/${interview.id}`}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    View
                  </Link>
                )}


              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Topic
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {interviews?.map((interview) => (
              <tr key={interview.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {interview.topic}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {interview.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(interview.status)}`}>
                    {formatStatus(interview.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="space-x-4">
                    {interview.status === "draft" && (
                      <Link
                        href={`/interviews/${interview.id}/edit`}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Edit
                      </Link>
                    )}

                    {interview.status === "published" && (
                      <Link
                        href={`/interviews/${interview.id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        View
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}