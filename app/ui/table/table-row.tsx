import { RowMenu } from "./row-menu";
import { Action, Column } from "./types";

export const TableRow = ({ 
    item, 
    columns,
    actions 
  }: { 
    item: any;
    columns: Column[];
    actions: Action[];
  }) => (
    <tr>
      {columns.map((column) => (
        <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-white">
          {column.render ? column.render(item[column.key]) : item[column.key]}
        </td>
      ))}
      <td className="px-10 py-4 whitespace-nowrap text-left text-sm font-medium">
        <RowMenu actions={actions} item={item} />
      </td>
    </tr>
  );