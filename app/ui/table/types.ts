import { ReactNode } from 'react';

export type Column = {
  key: string;
  label: string;
  render?: (value: any) => React.ReactNode;
};

export type Action = {
  label: string;
  onClick: (string: string) => void;
  showIf?: (item: any) => boolean;
};