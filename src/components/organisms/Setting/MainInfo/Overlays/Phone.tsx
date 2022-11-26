import { AddOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import BusinessServices from '@services/business';
import Input from '@components/molecules/kit/Input';
import { PHONE_OVERLAY } from '@constants/test';
import useBusiness from '@hooks/api/useBusiness';
import useToggle from '@hooks/useToggle';

type Props = Omit<OverlayProps, 'title' | 'children'> & {
  __test__?: {
    id: number;
    slug: string;
    phone_zero_starts: string;
    more_phone_numbers: string;
  };
};
const SettingPhoneOverlay = ({ open, onClose, __test__ }: Props) => {
  const { data: business, refetch } = useBusiness();
  const {
    id,
    slug,
    phone_zero_starts: initialPhone,
    more_phone_numbers
  } = __test__ || business || {};

  const [isLoading, toggleLoading] = useToggle(false);
  const [phones, setPhones] = useState<string[]>([initialPhone || '']);
  const [isEdited, setEdited] = useState<boolean>(false);

  const handleSubmit = () => {
    if (slug && id) {
      toggleLoading();
      BusinessServices.edit({
        phone: phones[0],
        more_phone_numbers: phones.slice(1).join('\n'),
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

  useEffect(() => {
    const splitPhones = more_phone_numbers?.split('\n') || [];
    const nonEmptySplitPhones = splitPhones.filter((item) => !!item);

    setPhones([initialPhone || '', ...nonEmptySplitPhones]);
  }, [business]);

  return (
    <Overlay
      title="شماره تماس"
      open={open}
      onClose={onClose}
      ctas={[
        { title: 'ثبت تغییرات', onClick: handleSubmit, loading: isLoading, disabled: !isEdited }
      ]}>
      <Box p={5}>
        {phones.map((phone, index) => (
          <Box my={3} key={`${phone}${index}`} display="flex" gap={3}>
            <Input
              inputProps={{
                'data-testid': PHONE_OVERLAY.input
              }}
              fullWidth
              autoFocus
              defaultValue={phone}
              onChange={({ target }) => {
                if (!isEdited) setEdited(true);

                setPhones((currentPhones) =>
                  currentPhones.map((phone, _index) => (_index === index ? target.value : phone))
                );
              }}
              label="شماره تماس"
              type="tel"
            />

            <IconButton
              disabled={index === 0}
              data-testId={PHONE_OVERLAY.removeButton}
              onClick={() =>
                setPhones((current) => current.filter((_, _index) => index !== _index))
              }>
              <DeleteOutlineOutlined />
            </IconButton>
          </Box>
        ))}

        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Button
            startIcon={<AddOutlined />}
            data-testId={PHONE_OVERLAY.addButton}
            onClick={() => setPhones((current) => [...current, ''])}>
            <Typography fontSize="12px" color="primary">
              افزودن شماره تماس
            </Typography>
          </Button>
        </Box>
      </Box>
    </Overlay>
  );
};
export default SettingPhoneOverlay;
