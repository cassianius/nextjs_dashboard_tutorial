'use-client'

import { usePathname } from "next/navigation";

export const RegistrationUrl = () => {
    const pathname = usePathname();
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const registrationUrl = `${baseUrl}/register`;
    
    return (
      <div className="flex items-center space-x-2">
        <p className="text-white font-medium break-all">{registrationUrl}</p>
        <button 
          onClick={() => navigator.clipboard.writeText(registrationUrl)}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          title="Copy URL"
        >
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        </button>
      </div>
    );
  };