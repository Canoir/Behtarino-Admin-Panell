import { Alert, Box, Button, Typography } from '@mui/material';

import { ROUTES } from '@constants/routes';
import { numberToPriceFormat } from '@utils/Numbers';
import useSubscriptionOffer from '@hooks/useSubscriptionOffer';

export default function CurrentSubscriptionInfoSoonOffer() {
  const { currentPlanTitle, handleRenewalClick, suggestData, contractDuration } =
    useSubscriptionOffer();

  if (!suggestData?.price) return null;

  return (
    <Box>
      <Alert severity="warning">
        از عضویت {currentPlanTitle} {contractDuration + ' ' + 'ماه‌ی'} کسب‌و‌کار شما فقط{' '}
        {suggestData.duration} روز باقی مانده است. برای تمدید آن <a href={ROUTES.RENEWAL}>اینجا</a>{' '}
        کلیک کنید.
      </Alert>

      <Typography fontSize={10} mt={5} display="flex" alignItems="baseline" gap={1} mb={1}>
        همین حالا تمدید کنید تا
        <Typography fontSize={12} fontWeight={500}>
          {numberToPriceFormat(suggestData.price)}شارژ تبلیغات
        </Typography>
        هدیه بگیرید.
      </Typography>

      <Button fullWidth variant="contained" onClick={handleRenewalClick}>
        تمدید عضویت
      </Button>
    </Box>
  );
}
