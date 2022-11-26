import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';

import Box from '@mui/material/Box';
import BusinessServices from '@services/business';
import Input from '@components/molecules/kit/Input';
import { InputAdornment } from '@mui/material';
import useBusiness from '@hooks/api/useBusiness';
import { useState } from 'react';
import useToggle from '@hooks/useToggle';

const SettingTelegramOverlay = ({ open, onClose }: Omit<OverlayProps, 'title' | 'children'>) => {
  const [isLoading, toggleLoading] = useToggle(false);

  const { data: business, refetch } = useBusiness();
  const { id, slug, telegram_url: initialTelegram } = business || {};

  const [telegramUrl, setTelegramUrl] = useState(initialTelegram);
  const [isEdited, setEdited] = useState<boolean>(false);

  const handleSubmit = () => {
    if (slug && id) {
      toggleLoading();
      BusinessServices.edit({
        telegram_url: telegramUrl ? `https://t.me/${telegramUrl}` : null,
        slug,
        id
      })
        .then(() => {
          refetch();
          onClose();
        })
        .finally(toggleLoading);
    }
  };
  return (
    <Overlay
      title="شبکه‌های اجتماعی"
      open={open}
      onClose={onClose}
      ctas={[
        { title: 'ثبت تغییرات', onClick: handleSubmit, loading: isLoading, disabled: !isEdited }
      ]}>
      <Box p={5}>
        <Input
          InputProps={{
            startAdornment: <InputAdornment position="start">https://t.me/</InputAdornment>
          }}
          dir="ltr"
          fullWidth
          defaultValue={initialTelegram?.replace('https://t.me/', '')}
          autoFocus
          label="تلگرام"
          onChange={(e) => {
            if (!isEdited) setEdited(true);

            setTelegramUrl(e.target.value);
          }}
        />
      </Box>
    </Overlay>
  );
};
export default SettingTelegramOverlay;
