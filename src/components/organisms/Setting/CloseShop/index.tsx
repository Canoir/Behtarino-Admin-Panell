import { Button, Typography } from '@mui/material';

import Card from '@components/molecules/kit/Card';
import SettingCloseShopOverlay from './Overlay';
import useToggle from '@hooks/useToggle';

export function SettingCloseShop() {
  const [isFrictionOpen, toggleFrictionOpen] = useToggle(false);
  return (
    <>
      <SettingCloseShopOverlay open={isFrictionOpen} onClose={toggleFrictionOpen} />

      <Card title="اعلام اتمام کار کسب‌و‌کار">
        <Typography color="text.secondary" py={3}>
          در صورتی که کسب‌و‌کار شما دیگر فعالیتی ندارد،{' '}
          <Button
            sx={{ minWidth: 'auto', py: 1, px: 2 }}
            variant="text"
            onClick={toggleFrictionOpen}>
            اینجا
          </Button>
          کلیک کنید.
        </Typography>
      </Card>
    </>
  );
}
