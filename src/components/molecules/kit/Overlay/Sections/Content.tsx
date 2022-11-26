import OverlayFooter, { OverlayFooterType } from './Footer';
import OverlayHeader, { OverlayHeaderType } from './Header';

import Box from '@mui/material/Box';
import { ReactElement } from 'react';

type OverlayContentType = {
  children: ReactElement;
};
const OverlayContent = ({
  children,
  title,
  ctas,
  onClose
}: OverlayFooterType & OverlayContentType & OverlayHeaderType) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="270px"
      width="100%"
      pb={4}
      bgcolor="bg.primary">
      <OverlayHeader title={title} onClose={onClose} />

      <Box maxHeight="calc(100vh - 135px)" overflow="auto" flex={1}>
        {children}
      </Box>

      <OverlayFooter ctas={ctas} />
    </Box>
  );
};
export default OverlayContent;
