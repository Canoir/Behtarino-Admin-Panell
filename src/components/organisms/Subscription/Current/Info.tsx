import { Box } from '@mui/material';
import Card from '@components/molecules/kit/Card';
import CurrentSubscriptionInfoHeader from '@components/molecules/Subscription/Current/Info/Header';
import OfferAlert from '@components/molecules/Subscription/Current/Info/OfferAlert';

export function CurrentSubscriptionInfo() {
  return (
    <Card>
      <Box
        width="100%"
        display="flex"
        gap={4}
        flexDirection="column"
        justifyContent="center"
        alignItems="stretch"
        px={{ md: 5 }}
        py={{ md: 6 }}>
        <CurrentSubscriptionInfoHeader />

        <OfferAlert />
      </Box>
    </Card>
  );
}
