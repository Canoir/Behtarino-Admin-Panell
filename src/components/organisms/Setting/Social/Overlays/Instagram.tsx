import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';

import Box from '@mui/material/Box';
import BusinessServices from '@services/business';
import Input from '@components/molecules/kit/Input';
import { InputAdornment } from '@mui/material';
import useBusiness from '@hooks/api/useBusiness';
import { useState } from 'react';
import useToggle from '@hooks/useToggle';

const SettingInstagramOverlay = ({ open, onClose }: Omit<OverlayProps, 'title' | 'children'>) => {
  const { data: business, refetch } = useBusiness();
  const { id, slug, instagram_url: initialInstagram } = business || {};

  const [isLoading, toggleLoading] = useToggle(false);

  const [instagramUrl, setInstagramUrl] = useState(initialInstagram);
  const [isEdited, setEdited] = useState<boolean>(false);

  const handleSubmit = () => {
    if (slug && id) {
      toggleLoading();
      BusinessServices.edit({
        instagram_url: instagramUrl ? `https://instagram.com/${instagramUrl}` : null,
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
            startAdornment: <InputAdornment position="start">https://instagram.com/</InputAdornment>
          }}
          dir="ltr"
          fullWidth
          autoFocus
          defaultValue={initialInstagram?.replace('https://instagram.com/', '')}
          onChange={(e) => {
            if (!isEdited) setEdited(true);

            setInstagramUrl(e.target.value);
          }}
          label="اینستاگرام"
        />
      </Box>
    </Overlay>
  );
};
export default SettingInstagramOverlay;
