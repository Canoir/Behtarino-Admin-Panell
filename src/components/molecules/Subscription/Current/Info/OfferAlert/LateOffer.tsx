import { Alert, Box, Button } from '@mui/material';

import { ROUTES } from '@constants/routes';
import useSubscriptionOffer from '@hooks/useSubscriptionOffer';

export default function CurrentSubscriptionInfoLateOffer() {
  const { currentPlanTitle, contractDuration, handleRenewalClick } = useSubscriptionOffer();

  return (
    <Box>
      <Alert severity="error" style={{ marginBottom: '8px' }}>
        عضویت {currentPlanTitle} {contractDuration + ' ' + 'ماه‌ی'} کسب‌و‌کار شما به پایان رسیده
        است. برای تمدید آن <a href={ROUTES.RENEWAL}>اینجا</a> کلیک کنید.
      </Alert>

      <Button fullWidth variant="contained" onClick={handleRenewalClick}>
        تمدید عضویت
      </Button>
    </Box>
  );
}
