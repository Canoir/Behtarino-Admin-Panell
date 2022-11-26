import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export type OverlayHeaderType = {
  title: string;
  onClose: () => void;
};
const OverlayHeader = ({ title, onClose }: OverlayHeaderType) => {
  return (
    <Box
      bgcolor="bg.primary"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={3}
      py={5}
      sx={{ borderBottom: 1 }}>
      <IconButton sx={{ position: 'absolute', left: '8px' }} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <Typography>{title}</Typography>
    </Box>
  );
};
export default OverlayHeader;
