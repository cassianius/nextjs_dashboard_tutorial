// TableRowMobile.tsx
'use client';

import { ApplicantListItem } from "@/app/actions/applicant";
import { CopyButton } from "../../shared/copy-button";
import { differenceInDays } from "date-fns";


function getExpirationText(expirationDate: Date) {
    const now = new Date();
    if (expirationDate < now) {
        return <span className="text-red-400">Expired</span>;
    }
    const daysLeft = differenceInDays(expirationDate, now);
    return <span className="text-gray-300">{daysLeft} days</span>;
}

export const TableRowMobile = ({ applicant }: { applicant: ApplicantListItem }) => (
    <div className="mb-4 p-4 bg-gray-700 rounded-lg">
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">{applicant.name}</h3>
                <span className="text-sm text-gray-300">
                    {applicant.session_count} sessions
                </span>
            </div>
            <p className="text-gray-300 text-sm">{applicant.email}</p>
            {applicant.phone && (
                <p className="text-gray-300 text-sm">{applicant.phone}</p>
            )}
            {applicant.sessionAccess && (
                <div className="flex justify-between text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                        <span>{applicant.sessionAccess.access_code}</span>
                        <CopyButton textToCopy={applicant.sessionAccess.access_code} />
                    </div>
                    {getExpirationText(new Date(applicant.sessionAccess.expiration))}
                </div>
            )}
        </div>
    </div>
);