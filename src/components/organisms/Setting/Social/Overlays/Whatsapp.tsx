import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';

import Box from '@mui/material/Box';
import BusinessServices from '@services/business';
import Input from '@components/molecules/kit/Input';
import { InputAdornment } from '@mui/material';
import useBusiness from '@hooks/api/useBusiness';
import { useState } from 'react';
import useToggle from '@hooks/useToggle';

const SettingWhatsappOverlay = ({ open, onClose }: Omit<OverlayProps, 'title' | 'children'>) => {
  const [isLoading, toggleLoading] = useToggle(false);

  const { data: business, refetch } = useBusiness();
  const { id, slug, whatsapp_url: initial_whatsapp } = business || {};

  const [whatsappUrl, setWhatsappUrl] = useState(initial_whatsapp);
  const [isEdited, setEdited] = useState<boolean>(false);

  const handleSubmit = () => {
    if (slug && id) {
      toggleLoading();
      BusinessServices.edit({
        whatsapp_url: whatsappUrl ? `https://wa.me/${whatsappUrl}` : null,
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
            startAdornment: <InputAdornment position="start">https://wa.me/</InputAdornment>
          }}
          dir="ltr"
          fullWidth
          defaultValue={initial_whatsapp?.replace('https://wa.me/', '')}
          autoFocus
          label="واتس‌اپ"
          onChange={(e) => {
            if (!isEdited) setEdited(true);

            setWhatsappUrl(e.target.value);
          }}
        />
      </Box>
    </Overlay>
  );
};
export default SettingWhatsappOverlay;
