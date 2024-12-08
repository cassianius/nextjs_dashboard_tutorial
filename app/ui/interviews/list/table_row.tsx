'use client';

import { InterviewListItem } from "@/app/actions/interview";
import { RowMenu } from "./row_menu";

interface Interview {
  id: number;
  company_name: string;
  job_name: string;
  applicant_count: number;
  session_count: number;
  status: string;  // kept for RowMenu functionality
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export const TableRow = ({ interview }: { interview: InterviewListItem }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
      {formatDate(interview.created_at)}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
      {interview.company_name}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
      {interview.job_name}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-300">
      {interview.applicant_count}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-300">
      {interview.session_count}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
      <RowMenu status={interview.status} id={interview.id} />
    </td>
  </tr>
);

