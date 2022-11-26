import { Avatar, Box, Typography } from '@mui/material';

import useBusiness from '@hooks/api/useBusiness';

function ReviewFeedbackReply({ reply }: { reply: string }) {
  const { data: currentBusiness } = useBusiness();
  //
  return (
    <Box ml={12} py={3} mt={3} borderTop={(theme) => '1px solid ' + theme.palette.divider}>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={currentBusiness?.cover_image_url} />
        <Typography fontSize="14px" fontWeight={500}>
          پاسخ شما
        </Typography>
      </Box>

      <Box mt={3} ml={1}>
        <Typography color="text.secondary" fontSize="12px">
          {reply}
        </Typography>
      </Box>
    </Box>
  );
}

export default ReviewFeedbackReply;
