import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import SettingAddress from '@components/organisms/Setting/Address';
import { SettingCloseShop } from '@components/organisms/Setting/CloseShop';
import SettingHeader from '@components/organisms/Setting/Header';
import SettingImages from '@components/organisms/Setting/Images';
import SettingMainInfo from '@components/organisms/Setting/MainInfo';
import SettingSocial from '@components/organisms/Setting/Social';
import SettingWorkingHours from '@components/organisms/Setting/WorkingHours';
import useBusiness from '@hooks/api/useBusiness';

const SettingPage = () => {
  const { data: business } = useBusiness();

  return (
    <Box display="flex" justifyContent="center">
      {business ? (
        <Box width="100%" display="flex" gap={3} flexDirection="column">
          <SettingHeader />
          <SettingMainInfo />
          <SettingAddress />
          <SettingImages />
          <SettingWorkingHours />
          <SettingSocial />
          <SettingCloseShop />
        </Box>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
export default SettingPage;
