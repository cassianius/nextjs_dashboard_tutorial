import { FormattedApplicantsTable } from '@/app/lib/definitions';
import { fetchApplicants } from '@/app/lib/actions/fetchApplicants';
import Link from 'next/link';

export default async function ApplicantsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const applicants = await fetchApplicants(query, currentPage) as FormattedApplicantsTable[];

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">

      {/* Mobile view */}
      <div className="md:hidden">
        {applicants?.map((applicant) => (
          <div
            key={applicant.id}
            className="mb-4 p-4 bg-gray-700 rounded-lg"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">
                  {applicant.first} {applicant.last}
                </h3>
              </div>
              <p className="text-gray-300 text-sm">{applicant.email}</p>
              <p className="text-gray-300 text-sm">{applicant.phone}</p>
              <div className="pt-2 flex justify-end space-x-4">
                <Link 
                  href={`/applicants/${applicant.id}`}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View
                </Link>
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
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {applicants?.map((applicant) => (
              <tr key={applicant.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {applicant.first}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {applicant.last}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {applicant.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {applicant.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="space-x-4">
                    <Link 
                      href={`/applicants/${applicant.id}`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View
                    </Link>
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