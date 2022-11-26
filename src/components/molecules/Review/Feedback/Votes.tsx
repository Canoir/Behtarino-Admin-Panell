import { Box, Button, Typography } from '@mui/material';
import { ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';

import { When } from 'react-if';
import moment from 'moment-jalaali';

type Props = {
  upVote: number;
  downVote: number;
  toggleOverlay: () => void;
  hasReply: boolean;
  date: moment.Moment;
};
function Votes(props: Props) {
  const { downVote, hasReply, toggleOverlay, upVote, date } = props;
  //
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} ml={2}>
      <Box display="flex" gap={7} alignItems="center">
        <Box display="flex" gap={1} alignItems="center">
          <ThumbUpOutlined color="success" sx={{ width: '14px', height: '14px' }} />

          <Typography fontSize="12px" textAlign="center" lineHeight="20px">
            {upVote}
          </Typography>
        </Box>

        <Box display="flex" gap={1} alignItems="center">
          <ThumbDownOutlined color="error" sx={{ width: '14px', height: '14px' }} />

          <Typography fontSize="12px" textAlign="center" lineHeight="20px">
            {downVote}
          </Typography>
        </Box>

        <When condition={!hasReply}>
          <Button sx={{ fontSize: '12px', color: 'text.secondary' }} onClick={toggleOverlay}>
            پاسخ دادن
          </Button>
        </When>
      </Box>

      <Typography fontSize="12px">{moment(date).format('jYYYY/jMM/jDD')}</Typography>
    </Box>
  );
}

export default Votes;
