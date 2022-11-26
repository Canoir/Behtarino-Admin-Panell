import { Avatar, Box, Rating, TextField, Typography } from '@mui/material';
import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';

import { Review } from '@typings/Review';
import ReviewService from '@services/review';
import { When } from 'react-if';
import useDetectKeyboardOpen from 'use-detect-keyboard-open';
import { useState } from 'react';
import useToggle from '@hooks/useToggle';

function ReplyReviewOverlay({
  open,
  onClose,
  review
}: Omit<OverlayProps, 'title' | 'children'> & { review?: Review }) {
  const [reply, setReply] = useState<string>();
  const [isLoading, toggleLoading] = useToggle(false);
  const isKeyboardOpen = useDetectKeyboardOpen();

  const { rate, creator_name, comment, id } = review || {};

  return (
    <Overlay
      title="پاسخ دادن"
      open={open}
      onClose={onClose}
      ctas={[
        {
          title: 'ثبت پاسخ',
          onClick: () => {
            toggleLoading();
            ReviewService.reply(id!, reply!)
              .then(() => {
                toggleLoading();
                onClose();
              })
              .catch(toggleLoading);
          },
          loading: isLoading,
          disabled: !reply
        }
      ]}>
      <Box pt={5} px={4}>
        <When condition={!isKeyboardOpen}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar />
              <Typography fontSize="14px" fontWeight={500}>
                {creator_name || 'کاربر بهترینو'}
              </Typography>
            </Box>

            <Box sx={{ transform: 'scaleX(-1)' }}>
              <Rating value={(rate || 0) / 20} readOnly precision={0.5} />
            </Box>
          </Box>
          <Box mt={3}>
            <Typography color="text.secondary" fontSize="12px">
              {comment}
            </Typography>
          </Box>
        </When>

        <Box mt={3} mb={23}>
          <TextField
            multiline
            fullWidth
            minRows={4}
            label="پاسخ شما به این دیدگاه"
            variant="outlined"
            onChange={(event) => setReply(event.target.value)}
          />
        </Box>
      </Box>
    </Overlay>
  );
}

export default ReplyReviewOverlay;
