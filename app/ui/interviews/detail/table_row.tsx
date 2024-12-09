import { ApplicantListItem } from "@/app/actions/applicant";

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
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        {/* Action button placeholder */}
        <div className="h-4 w-4" />
      </td>
    </tr>
  );