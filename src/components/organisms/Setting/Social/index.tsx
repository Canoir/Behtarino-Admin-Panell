import { Grid, Typography } from '@mui/material';

import Card from '@components/molecules/kit/Card';
import MainInfoItem from '@components/molecules/Setting/MainInfoItem';
import SettingInstagramOverlay from '@components/organisms/Setting/Social/Overlays/Instagram';
import SettingTelegramOverlay from '@components/organisms/Setting/Social/Overlays/Telegram';
import SettingWhatsappOverlay from '@components/organisms/Setting/Social/Overlays/Whatsapp';
import useBusiness from '@hooks/api/useBusiness';

const SettingSocial = () => {
  const { data: business } = useBusiness();
  const { whatsapp_url, telegram_url, instagram_url } = business || {};
  return (
    <Card title="شبکه‌های اجتماعی" id="socials">
      <Typography color="text.secondary" py={3}>
        شما می‌توانید شبکه‌های اجتماعی خود را وارد کرده و راه‌های ارتباطی مشتری‌هایتان را بیشتر
        کنید.
      </Typography>
      <Grid container>
        <MainInfoItem
          title="واتساپ"
          content={
            <Typography color="text.secondary" maxHeight={24} overflow="hidden">
              {whatsapp_url || 'شماره‌ی واتس‌اپ کسب‌و‌کار خود را وارد کنید.'}
            </Typography>
          }
          Overlay={SettingWhatsappOverlay}
        />
        <MainInfoItem
          title="تلگرام"
          Overlay={SettingTelegramOverlay}
          content={
            <Typography color="text.secondary" maxHeight={24} overflow="hidden">
              {telegram_url || 'آی‌دی تلگرام کسب‌و‌کار خود را وارد کنید.'}
            </Typography>
          }
        />
        <MainInfoItem
          title="اینستاگرام"
          Overlay={SettingInstagramOverlay}
          content={
            <Typography color="text.secondary" maxHeight={24} overflow="hidden">
              {instagram_url || 'آی‌دی اینستاگرام کسب‌و‌کار خود را وارد کنید.'}
            </Typography>
          }
          noDivider
        />
      </Grid>
    </Card>
  );
};

export default SettingSocial;
