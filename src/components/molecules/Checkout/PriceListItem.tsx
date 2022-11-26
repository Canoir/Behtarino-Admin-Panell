import { Box, Divider, TableCell, Typography } from '@mui/material';

import { numberToPriceFormat } from '@utils/Numbers';

export function PriceListItem(props: {
  price: number;
  title: string;
  isImportant?: boolean;
  isLatest?: boolean;
}) {
  const { price, title, isImportant, isLatest = false } = props;

  return (
    <TableCell sx={{ display: 'flex', py: 3, border: isLatest ? 'none' : undefined }}>
      <Box width="60%">
        <Typography fontWeight={isImportant ? 600 : undefined}>{title}</Typography>
      </Box>
      <Box width="40%" alignItems="end" justifyContent="end" display="flex">
        <Typography
          fontWeight={isImportant ? 500 : undefined}
          color={isImportant ? 'text.primary' : 'text.secondary'}>
          {numberToPriceFormat(price)}
        </Typography>
      </Box>

      <Divider />
    </TableCell>
  );
}
