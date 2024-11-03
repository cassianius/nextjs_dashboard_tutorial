import { fetchParticipants } from '@/app/lib/data';
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
        <div className="rounded-lg bg-gray-800 p-2 md:pt-0">
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
            <thead className="rounded-lg text-left text-sm font-normal bg-transparent">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  First Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone
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
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateParticipant id={participant.id} />
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