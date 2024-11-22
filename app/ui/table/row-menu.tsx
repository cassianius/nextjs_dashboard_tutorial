import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Action, Column } from "./types";

export const RowMenu = ({ actions, item }: { 
  actions: Action[];
  item: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: Action) => {
    setIsOpen(false);
    action.onClick(item.id);
  };

  const filteredActions = actions.filter(action => 
    !action.showIf || action.showIf(item)
  );

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-800 focus:outline-none"
      >
        <MoreVertical className="h-5 w-5 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[100]" 
            onClick={() => setIsOpen(false)}
          />
          <div 
            className="fixed w-24 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-[100]"
           
          >
            <div 
              className="py-0.5 flex flex-col" 
              role="menu" 
              aria-orientation="vertical"
            >
              {filteredActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleAction(action)}
                  className="w-full text-left px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-800"
                  role="menuitem"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};