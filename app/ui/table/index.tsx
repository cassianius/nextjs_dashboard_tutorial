'use client';

import { default as GenericTable } from './generic-table';
import { TableHeader } from './table-header';
import { TableRow } from './table-row';
import { TableRowMobile } from './table-row-mobile';
import { RowMenu } from './row-menu';
import type { Column, Action } from './types';

export {
  GenericTable,
  TableHeader,
  TableRow,
  TableRowMobile,
  RowMenu,
  // Type exports
  type Column,
  type Action,
};

// Make GenericTable the default export as well
export default GenericTable;