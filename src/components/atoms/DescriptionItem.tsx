import { Box, Typography, useTheme } from '@mui/material';

import { ReactNode } from 'react';

type Props = { icon: ReactNode; title: string; description: string | number };
export function DescriptionItem(props: Props) {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      borderRadius={1}
      sx={{ background: theme?.palette.primary.light }}
      p={2}
      gap={2}>
      {props.icon}

      <Box display="flex" justifyContent="space-between" alignItems="center" minWidth="100px">
        <Typography color="primary">{props.title}</Typography>
        <Typography color="primary">{props.description}</Typography>
      </Box>
    </Box>
  );
}
