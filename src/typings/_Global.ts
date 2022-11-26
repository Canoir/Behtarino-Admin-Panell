import { SxProps, Theme } from '@mui/material';

export type GlobalStyle = SxProps<Theme>;

export interface Response<T> {
  data: T;
  meta: {
    paginated: boolean;
    status_code: number;
  };
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}