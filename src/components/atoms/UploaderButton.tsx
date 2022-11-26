import Button, { ButtonProps } from '@mui/material/Button';
import PanoramaIcon from '@mui/icons-material/Panorama';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const UploaderButton = ({ sx, ...props }: ButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      sx={{
        width: 70,
        height: 70,
        border: `1px dashed ${theme.palette.grey[400]}`,
        display: 'flex',
        ...sx
      }}
      {...props}>
      <Box position="relative" display="flex">
        <PanoramaIcon fontSize="large" sx={{ color: '#cccccc' }} />
        <AddCircleIcon fontSize="small" sx={{ position: 'absolute', left: -5, bottom: 0 }} />
      </Box>
    </Button>
  );
};

export default UploaderButton;
