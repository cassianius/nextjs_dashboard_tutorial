'use client';

import { useState } from 'react';
import { Interview } from '../../../lib/definitions'
import { LinkIcon, KeyIcon } from '@heroicons/react/24/outline';
import { getCompanyId } from '@/auth';

export default function InterviewDetails({
  interview,
}: {
  interview: Interview;
}) {
  const [showCopyTooltip, setShowCopyTooltip] = useState('');
  const shareableLink = `${process.env.NEXT_PUBLIC_BASE_URL}/onboard?cid=${interview.company_id}&iid=${interview.id}`;

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyTooltip(type);
      setTimeout(() => setShowCopyTooltip(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gray-900 min-h-screen text-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{interview.topic}</h1>
          <div className="flex space-x-4 text-sm text-gray-400">
            <span>Industry: {interview.industry}</span>
            <span>Published: {new Date(interview.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Share Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shareable Link Card */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <LinkIcon className="h-5 w-5 text-blue-400" />
              <div>
                <h3 className="text-white font-medium">Shareable Link</h3>
                <p className="text-sm text-gray-400">{shareableLink}</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => copyToClipboard(shareableLink, 'link')}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Copy
              </button>
              {showCopyTooltip === 'link' && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded">
                  Copied!
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <KeyIcon className="h-5 w-5 text-blue-400" />
              <div>
                <h3 className="text-white font-medium">Access Code</h3>
                <p className="text-sm text-gray-400">{interview.access_code_signup}</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => copyToClipboard(interview.access_code_signup, 'code')}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Copy
              </button>
              {showCopyTooltip === 'code' && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded">
                  Copied!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}