'use client';

import { FormattedInterviewsTable } from "@/app/lib/definitions";
import { RowMenu } from "./row_menu";
import { formatStatus, getStatusClass } from "../../../lib/utils"

export const TableRowMobile = ({ interview }: { interview: FormattedInterviewsTable }) => (
  <div className="mb-4 p-4 bg-gray-700 rounded-lg">
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium">{interview.topic}</h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(interview.status)}`}>
          {formatStatus(interview.status)}
        </span>
      </div>
      <p className="text-gray-300 text-sm">{interview.date}</p>
      <div className="pt-2 flex justify-end">
        <RowMenu status={interview.status} id={interview.id} />
      </div>
    </div>
  </div>
);