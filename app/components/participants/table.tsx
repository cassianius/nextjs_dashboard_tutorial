import { fetchParticipants } from '@/app/lib/data_dummy_participants';
import { UpdateParticipant } from './buttons';

type FormattedParticipantsTable = {
  id: string;
  first: string;
  last: string;
  email: string;
  phone: string;
};

export default async function ParticipantsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const participants = await fetchParticipants(query, currentPage) as FormattedParticipantsTable[];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-800 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {participants?.map((participant) => (
              <div
                key={participant.id}
                className="mb-2 w-full rounded-md bg-transparent p-4"
              >
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className="text-white">
                        {participant.first} {participant.last}
                      </p>
                    </div>
                    <p className="text-sm text-white/70">{participant.email}</p>
                  </div>
                  <p className="text-sm text-white/70">{participant.phone}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <table className="hidden min-w-full text-white md:table">
          <thead className="bg-gray-700">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {participants?.map((participant) => (
                <tr
                  key={participant.id}
                  className="w-full border-b border-white/20 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-white/5"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p className="text-white">{participant.first}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {participant.last}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {participant.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-white">
                    {participant.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
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