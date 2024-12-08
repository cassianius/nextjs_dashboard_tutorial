"use client";

import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const RowMenu = ({ status, id }: { status: string; id: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
  
    const handleNavigation = (path: string) => {
      setIsOpen(false);
      router.push(path);
    };

    return (
      <div className="items-center text-center">
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
                  <button
                    onClick={() => handleNavigation(`/interviews/${id}/edit`)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                    role="menuitem"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleNavigation(`interviews/${id}`)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                  role="menuitem"
                >
                  View
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };