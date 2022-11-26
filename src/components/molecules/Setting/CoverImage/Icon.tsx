import EditOutlined from '@mui/icons-material/EditOutlined';
import Box from '@mui/material/Box';

const CoverImageIcon = () => {
  return (
    <Box
      position="absolute"
      bgcolor="background.default"
      boxShadow={1}
      sx={{
        bottom: 0,
        borderRadius: '50%',
        flexShrink: 0
      }}
      width={{ xs: 32, md: 44 }}
      height={{ xs: 32, md: 44 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <EditOutlined sx={{ fontSize: { xs: 18, md: 24 } }} />
    </Box>
  );
};
export default CoverImageIcon;
