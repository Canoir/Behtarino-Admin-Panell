import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';

import Box from '@mui/material/Box';
import BusinessServices from '@services/business';
import Input from '@components/molecules/kit/Input';
import useBusiness from '@hooks/api/useBusiness';
import { useState } from 'react';
import useToggle from '@hooks/useToggle';
import useUser from '@hooks/api/useUser';

const SettingTitleOverlay = ({ open, onClose }: Omit<OverlayProps, 'title' | 'children'>) => {
  const [isLoading, toggleLoading] = useToggle(false);

  const { data: business, refetch } = useBusiness();
  const { refetch: businessListRefetch } = useUser();
  const { id, slug, title: initialTitle } = business || {};

  const [title, setTitle] = useState(initialTitle);
  const [isEdited, setEdited] = useState<boolean>(false);

  const handleSubmit = () => {
    if (slug && id) {
      toggleLoading();
      BusinessServices.edit({ title, slug, id })
        .then(() => {
          refetch();
          businessListRefetch();
          onClose();
        })
        .finally(toggleLoading);
    }
  };

  return (
    <Overlay
      title="ویرایش نام کسب‌وکار"
      open={open}
      onClose={onClose}
      ctas={[
        { title: 'ثبت تغییرات', onClick: handleSubmit, loading: isLoading, disabled: !isEdited }
      ]}>
      <Box p={5}>
        <Input
          fullWidth
          defaultValue={initialTitle}
          autoFocus
          label="اسم کسب‌وکار"
          onChange={(e) => {
            if (!isEdited) setEdited(true);

            setTitle(e.target.value);
          }}
        />
      </Box>
    </Overlay>
  );
};
export default SettingTitleOverlay;
