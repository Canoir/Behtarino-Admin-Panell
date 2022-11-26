import { LoadingButton, LoadingButtonProps } from '@mui/lab';

import Box from '@mui/material/Box';

export type OverlayFooterType = {
  ctas?: LoadingButtonProps[];
};
const OverlayFooter = ({ ctas = [] }: OverlayFooterType) => {
  return (
    <Box bgcolor="bg.primary" display="flex" gap={2} justifyContent="center" alignItems="center" px={5}>
      {ctas.map(({ title, ...rest }, mapIndex) => (
        <LoadingButton fullWidth variant="contained" {...rest} key={mapIndex}>
          {title}
        </LoadingButton>
      ))}
    </Box>
  );
};
export default OverlayFooter;
