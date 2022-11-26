import Box from '@mui/material/Box';
import { Drawer } from '@mui/material';
import { LoadingButtonProps } from '@mui/lab';
import Modal from '@mui/material/Modal';
import OverlayContent from '@components/molecules/kit/Overlay/Sections/Content';
import { ReactElement } from 'react';
import { Responsive } from '../Responsive';

export interface OverlayProps {
  open: boolean;
  children: ReactElement;
  title: string;
  ctas?: LoadingButtonProps[];
  onClose: () => void;
}

const Overlay = ({ children, title, ctas, ...props }: OverlayProps) => {
  const { onClose } = props;

  return (
    <>
      <Responsive.Desktop>
        <Modal
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          {...props}>
          <Box position="relative" borderRadius={1} overflow="hidden" width={450}>
            <OverlayContent ctas={ctas} title={title} onClose={onClose}>
              {children}
            </OverlayContent>
          </Box>
        </Modal>
      </Responsive.Desktop>

      <Responsive containedKey="md">
        <Drawer
          sx={{ zIndex: 'modal' }}
          PaperProps={{
            sx: { borderTopLeftRadius: 8, borderTopRightRadius: 8 }
          }}
          anchor="bottom"
          {...props}>
          <OverlayContent ctas={ctas} title={title} onClose={onClose}>
            {children}
          </OverlayContent>
        </Drawer>
      </Responsive>
    </>
  );
};

export default Overlay;
