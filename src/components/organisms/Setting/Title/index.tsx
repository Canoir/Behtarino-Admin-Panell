import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SettingTitleOverlay from '@components/organisms/Setting/MainInfo/Overlays/Title';
import Typography from '@mui/material/Typography';
import useBusiness from '@hooks/api/useBusiness';
import useToggle from '@hooks/useToggle';

const SettingTitle = (): JSX.Element => {
  const { data: business, getBusinessAcceptanceTitle } = useBusiness();
  const [isModalOpen, toggleModalOpen] = useToggle(false);

  return (
    <Box textAlign="center" mt={3}>
      <SettingTitleOverlay open={isModalOpen} onClose={toggleModalOpen} />
      <Button onClick={toggleModalOpen}>
        <Typography variant="h5">{business?.title}</Typography>
      </Button>

      <Typography fontSize="12px" fontWeight="500" color="text.secondary">
        وضعیت کسب‌و‌کار: {getBusinessAcceptanceTitle()}
      </Typography>
    </Box>
  );
};
export default SettingTitle;
