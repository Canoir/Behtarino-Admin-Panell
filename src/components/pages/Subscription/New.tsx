import { Box, Typography } from '@mui/material';

import { NewSuberSubscriptionChoices } from '@components/organisms/Subscription/New/Choices';
import { NewSubscriptionHeader } from '@components/organisms/Subscription/New/Header';

export function NewSubscriptionPage() {
  return (
    <Box mt={{ xs: 4, md: 12 }}>
      <NewSubscriptionHeader />

      <Box mt={7}>
        <Typography fontWeight={500} fontSize={22} lineHeight="44px" textAlign="center">
          شما هم عضو ویژه‌ی بهترینو شوید.
        </Typography>

        <Box id="subs" mt={2}>
          <NewSuberSubscriptionChoices />
        </Box>
      </Box>
    </Box>
  );
}
