"use_client";

import { MoreVertical } from "lucide-react";
import { useState } from "react";

export const RowMenu = ({ status, id }: { status: string; id: string }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-full hover:bg-gray-700 focus:outline-none"
        >
          <MoreVertical className="h-5 w-5 text-gray-400" />
        </button>
  
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            <div 
              className="absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-20"
            >
              <div className="py-1" role="menu" aria-orientation="vertical">
                {status === "draft" && (
                  <a
                    href={`/interviews/${id}/edit`}
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                    role="menuitem"
                  >
                    Edit
                  </a>
                )}
                <a
                  href={`/interviews/${id}`}
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                  role="menuitem"
                >
                  View
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };