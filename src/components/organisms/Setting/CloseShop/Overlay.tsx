import { Box, Typography } from '@mui/material';
import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';

import BusinessServices from '@services/business';
import useToggle from '@hooks/useToggle';

const SettingCloseShopOverlay = ({ open, onClose }: Omit<OverlayProps, 'title' | 'children'>) => {
  const [isLoading, toggleLoading] = useToggle(false);

  const handleSubmit = () => {
    toggleLoading();
    BusinessServices.edit({ has_been_closed: true }).finally(toggleLoading);
  };

  return (
    <Overlay
      title="اعلام اتمام کار کسب‌وکار"
      open={open}
      onClose={onClose}
      ctas={[
        {
          title: 'انصراف',
          onClick: onClose
        },
        {
          title: 'ثبت اتمام کار',
          onClick: handleSubmit,
          variant: 'outlined',
          loading: isLoading
        }
      ]}>
      <Box p={5}>
        <Typography lineHeight="26px">
          با اعلام اتمام کار، کسب‌وکار شما از این به بعد در بهترینو نمایش داده نمی‌شود.
          <br />
          آیا کسب‌وکار شما فعالیت خود را متوقف کرده و دیگر کار نمی‌کند؟
        </Typography>
      </Box>
    </Overlay>
  );
};
export default SettingCloseShopOverlay;
