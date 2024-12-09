// table_row.tsx
import { ApplicantListItem } from "@/app/actions/applicant";
import { differenceInDays } from "date-fns";
import { CopyButton } from "../../shared/copy-button";

function getExpirationText(expirationDate: Date) {
  const now = new Date();
  if (expirationDate < now) {
    return <span className="text-red-400">Expired</span>;
  }
  const daysLeft = differenceInDays(expirationDate, now);
  return <span className="text-gray-300">{daysLeft} days</span>;
}

export const ApplicantTableRow = ({ applicant }: { applicant: ApplicantListItem }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
      {applicant.name}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
      {applicant.email}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
      {applicant.phone}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-300">
      {applicant.session_count}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
      {applicant.sessionAccess ? (
        <div className="flex items-center space-x-2">
          <span>{applicant.sessionAccess.access_code}</span>
          <CopyButton textToCopy={applicant.sessionAccess.access_code} />
        </div>
      ) : (
        "-"
      )}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm">
      {applicant.sessionAccess ? (
        getExpirationText(new Date(applicant.sessionAccess.expiration))
      ) : (
        "-"
      )}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
      {/* Action button placeholder */}
      <div className="h-4 w-4" />
    </td>
  </tr>
);