import { fetchInterviews } from '@/app/lib/data_dummy_interviews';
import { UpdateInterview } from './buttons';
import { FormattedInterviewsTable } from '@/app/lib/definitions';

export default async function InterviewsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const interviews = await fetchInterviews(query, currentPage) as FormattedInterviewsTable[];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-800 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {interviews?.map((interview) => (
              <div
                key={interview.id}
                className="mb-2 w-full rounded-md bg-transparent p-4"
              >
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className="text-white">
                        {interview.subject}
                      </p>
                    </div>
                    <p className="text-sm text-white/70">{interview.date}</p>
                  </div>
                  <p className="text-sm text-white/70">{interview.status}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <table className="hidden min-w-full text-white md:table">
            <thead className="rounded-lg text-left text-sm font-normal bg-transparent">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Subject
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {interviews?.map((interview) => (
                <tr
                  key={interview.id}
                  className="w-full border-b border-white/20 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-white/5"
                >
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {interview.subject}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {interview.date}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {interview.status}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInterview id={interview.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}