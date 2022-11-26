import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';

import Box from '@mui/material/Box';
import BusinessServices from '@services/business';
import Input from '@components/molecules/kit/Input';
import { InputAdornment } from '@mui/material';
import useBusiness from '@hooks/api/useBusiness';
import { useState } from 'react';
import useToggle from '@hooks/useToggle';

const SettingWebsiteOverlay = ({ open, onClose }: Omit<OverlayProps, 'title' | 'children'>) => {
  const { data: business, refetch } = useBusiness();
  const { id, slug, website: initialWebsite } = business || {};
  const [isLoading, toggleLoading] = useToggle(false);
  const [website, setWebsite] = useState(initialWebsite);
  const [isEdited, setEdited] = useState<boolean>(false);

  const handleSubmit = () => {
    if (slug && id) {
      toggleLoading();
      BusinessServices.edit({ website: website ? `https://${website}` : null, slug, id })
        .then(() => {
          refetch();
          onClose();
        })
        .finally(toggleLoading);
    }
  };
  return (
    <Overlay
      title="آدرس وبسایت"
      open={open}
      onClose={onClose}
      ctas={[
        { title: 'ثبت تغییرات', onClick: handleSubmit, loading: isLoading, disabled: !isEdited }
      ]}>
      <Box p={5}>
        <Input
          dir="ltr"
          InputProps={{
            startAdornment: <InputAdornment position="start">https://</InputAdornment>
          }}
          fullWidth
          defaultValue={initialWebsite?.replace('https://', '')}
          onChange={(e) => {
            if (!isEdited) setEdited(true);

            setWebsite(e.target.value);
          }}
          autoFocus
          label="آدرس وبسایت"
          placeholder="www.sample.com"
        />
      </Box>
    </Overlay>
  );
};
export default SettingWebsiteOverlay;
