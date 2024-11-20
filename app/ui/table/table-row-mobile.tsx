import { RowMenu } from "./row-menu";
import { Action, Column } from "./types";

export const TableRowMobile = ({ 
    item, 
    columns,
    actions 
  }: { 
    item: any;
    columns: Column[];
    actions: Action[];
  }) => (
    <div className="mb-4 p-4 bg-gray-700 rounded-lg">
      <div className="space-y-2">
        {columns.map((column, index) => (
          <div 
            key={column.key}
            className={`${index === 0 ? 'flex justify-between items-center' : ''}`}
          >
            {index === 0 ? (
              <>
                <h3 className="text-white font-medium">
                  {column.render ? column.render(item[column.key]) : item[column.key]}
                </h3>
              </>
            ) : (
              <p className="text-gray-300 text-sm">
                <span className="text-gray-400">{column.label}: </span>
                {column.render ? column.render(item[column.key]) : item[column.key]}
              </p>
            )}
          </div>
        ))}
        <div className="pt-2 flex justify-end">
          <RowMenu actions={actions} item={item} />
        </div>
      </div>
    </div>
  );