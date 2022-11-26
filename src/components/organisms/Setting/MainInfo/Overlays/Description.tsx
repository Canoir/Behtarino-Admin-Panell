import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';

import Box from '@mui/material/Box';
import BusinessServices from '@services/business';
import Input from '@components/molecules/kit/Input';
import useBusiness from '@hooks/api/useBusiness';
import { useState } from 'react';
import useToggle from '@hooks/useToggle';

const SettingDescriptionOverlay = ({ open, onClose }: Omit<OverlayProps, 'title' | 'children'>) => {
  const { data: business, refetch } = useBusiness();
  const { id, slug, description: initialDescription } = business || {};
  const [isLoading, toggleLoading] = useToggle(false);
  const [description, setDescription] = useState(initialDescription);
  const [isEdited, setEdited] = useState<boolean>(false);

  const handleSubmit = () => {
    if (slug && id) {
      toggleLoading();
      BusinessServices.edit({ description, slug, id }).then(() => {
        refetch();
        onClose();
      }).finally(toggleLoading);
    }
  };
  return (
    <Overlay
      title="توضیحات"
      open={open}
      onClose={onClose}
      ctas={[
        { title: 'ثبت تغییرات', onClick: handleSubmit, loading: isLoading, disabled: !isEdited }
      ]}>
      <Box p={5}>
        <Input
          fullWidth
          autoFocus
          defaultValue={initialDescription}
          onChange={(e) => {
            if (!isEdited) setEdited(true);

            setDescription(e.target.value);
          }}
          label="توضیحات"
          placeholder="کسب‌و‌کار خود را معرفی کنید."
          multiline
        />
      </Box>
    </Overlay>
  );
};
export default SettingDescriptionOverlay;
