import { Avatar, Box, Rating, Typography } from '@mui/material';

type Props = { creatorName: string; rate: number; comment: string };

function ReviewComment(props: Props) {
  const { comment, creatorName, rate } = props;
  //
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar />
          <Typography fontSize="14px" fontWeight={500}>
            {creatorName || 'کاربر بهترینو'}
          </Typography>
        </Box>

        <Box sx={{ transform: 'scaleX(-1)' }}>
          <Rating value={rate / 20} readOnly precision={0.1} />
        </Box>
      </Box>
      <Box mt={3}>
        <Typography color="text.secondary" fontSize="12px" ml={1}>
          {comment}
        </Typography>
      </Box>
    </>
  );
}

export default ReviewComment;
