import { FormattedParticipantsTable } from '@/app/lib/definitions';
import { fetchParticipants } from '@/app/lib/actions';
import Link from 'next/link';

export default async function ParticipantsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const participants = await fetchParticipants(query, currentPage) as FormattedParticipantsTable[];

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mt-8">

      {/* Mobile view */}
      <div className="md:hidden">
        {participants?.map((participant) => (
          <div
            key={participant.id}
            className="mb-4 p-4 bg-gray-700 rounded-lg"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">
                  {participant.first} {participant.last}
                </h3>
              </div>
              <p className="text-gray-300 text-sm">{participant.email}</p>
              <p className="text-gray-300 text-sm">{participant.phone}</p>
              <div className="pt-2 flex justify-end space-x-4">
                <Link 
                  href={`/participants/${participant.id}`}
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
            {participants?.map((participant) => (
              <tr key={participant.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {participant.first}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {participant.last}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {participant.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {participant.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="space-x-4">
                    <Link 
                      href={`/participants/${participant.id}`}
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