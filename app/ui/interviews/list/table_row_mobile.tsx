'use client';

import { InterviewListItem } from "@/app/actions/interview";
import { RowMenu } from "./row_menu";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export const TableRowMobile = ({ interview }: { interview: InterviewListItem }) => (
  <div className="mb-4 p-4 bg-gray-700 rounded-lg">
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-white font-medium">{interview.company_name}</h3>
        <RowMenu status={interview.status} id={interview.id} />
      </div>
      <p className="text-gray-300 text-sm">{interview.job_name}</p>
      <div className="flex justify-between text-sm text-gray-300">
        <span>Applicants: {interview.applicant_count}</span>
        <span>Sessions: {interview.session_count}</span>
      </div>
      <div className="text-sm text-gray-300">
        Created: {formatDate(interview.created_at)}
      </div>
    </div>
  </div>
);