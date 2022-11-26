import { Box, CircularProgress } from '@mui/material';

import { GENERAL } from '@constants/test';

type Props = { width?: string; height?: string };
export function Loader(props: Props) {
  const { width, height } = props;
  //
  return (
    <Box
      data-testid={GENERAL.loading}
      width={width || '100%'}
      height={height || '100vh'}
      display="flex"
      justifyContent="center"
      alignItems="center">
      <CircularProgress />
    </Box>
  );
}
