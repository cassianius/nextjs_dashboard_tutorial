'use client';

import { FormattedInterviewsTable } from "@/app/lib/definitions";
import { RowMenu } from "./row_menu";
import { formatStatus, getStatusClass } from "../../../lib/utils"

export const TableRow = ({ interview }: { interview: FormattedInterviewsTable }) => (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
        {interview.topic}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
        {interview.industry}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {interview.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(interview.status)}`}>
          {formatStatus(interview.status)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <RowMenu status={interview.status} id={interview.id} />
      </td>
    </tr>
  );