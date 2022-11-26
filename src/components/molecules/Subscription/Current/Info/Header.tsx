import { Box, Typography } from '@mui/material';

import useSubscriptionOffer from '@hooks/useSubscriptionOffer';

export default function CurrentSubscriptionInfoHeader() {
  const { currentPlanTitle, currentPlanEndDate } = useSubscriptionOffer();

  return (
    <Box display={{ md: 'flex' }} justifyContent={{ md: 'space-between' }}>
      <Typography color="secondary" fontSize="24px" mb={{ xs: 2, md: 0 }}>
        عضویت {currentPlanTitle}
      </Typography>

      <Typography color="text.secondary" fontSize="18px" display="flex" alignItems="center">
        تاریخ پایان: {currentPlanEndDate.format('jYYYY/jM/jD')}
      </Typography>
    </Box>
  );
}
