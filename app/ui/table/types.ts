import { ReactNode } from 'react';

export type Column = {
  key: string;
  label: string;
  render?: (value: any) => ReactNode;
}

export type Action = {
  label: string;
  onClick: (id: number) => void;
  showIf?: (item: any) => boolean;
}