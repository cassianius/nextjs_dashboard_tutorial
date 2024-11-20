import { Action, Column } from "./types";

export const TableHeader = ({ columns }: { columns: Column[] }) => (
    <thead className="bg-gray-700">
      <tr>
        {columns.map((column) => (
          <th 
            key={column.key}
            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
          >
            {column.label}
          </th>
        ))}
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
  