import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";
import { TableRowMobile } from "./table-row-mobile";
import { Action, Column } from "./types";

export default function GenericTable({ 
    items,
    columns,
    actions
  }: { 
    items: any[];
    columns: Column[];
    actions: Action[];
  }) {
    return (
      <div className="bg-gray-800 pt-6 pl-6 pr-6 rounded-xl shadow-lg mt-8">
        {/* Mobile view */}
        <div className="md:hidden">
          {items?.map((item) => (
            <TableRowMobile 
              key={item.id} 
              item={item}
              columns={columns}
              actions={actions}
            />
          ))}
        </div>
  
        {/* Desktop view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full">
            <TableHeader columns={columns} />
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {items?.map((item) => (
                <TableRow 
                  key={item.id} 
                  item={item}
                  columns={columns}
                  actions={actions}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }