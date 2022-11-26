import { Alert, Box, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import AdsServices from '@services/ads';
import { When } from 'react-if';
import { calculatePriceRange } from '@helpers/ads';
import { numberToPriceFormat } from '@utils/Numbers';
import useAdsReport from '@hooks/api/useAdsReport';

type Props = { range: number; slug?: string };
function CostPerClickFooterAlerts(props: Props) {
  const { range, slug } = props;

  const { data: adsReport } = useAdsReport();

  const { radius, subscription_type } = adsReport || {};

  const calculatedRangePrice = useMemo(
    () => calculatePriceRange(radius || 0, subscription_type),
    [radius]
  );

  const isRatePerClickMoreThanRadiusCosts = calculatedRangePrice <= (range || 0);

  const [rrpc, setRrpc] = useState<number>(0);

  useEffect(() => {
    if (slug && !rrpc)
      AdsServices.recommendedClicks(slug).then((result) =>
        setRrpc(result.click_price_recommendation)
      );
  }, [slug]);

  //
  return (
    <>
      <When condition={rrpc}>
        <Box mt={4} sx={{ background: (theme) => theme.palette.divider }} p={3} borderRadius={1}>
          <Typography fontSize="14px">
            میانگین هزینه‌ی تبلیغات کلیکی در دسته‌بندی کسب‌و‌کار شما {numberToPriceFormat(rrpc)}{' '}
            است.
          </Typography>
        </Box>
      </When>

      <Box mt={32}>
        <Alert
          severity="warning"
          sx={{ visibility: !isRatePerClickMoreThanRadiusCosts ? 'visible' : 'hidden' }}>
          با انتخاب این مبلغ، کسب‌و‌کار شما در مناطق کم‌تری نمایش داده خواهد شد.
        </Alert>
      </Box>

      <Typography sx={{ mt: 4 }}>
        برای راهنمایی بیشتر با {<a href="https://behtarino.com/contact">پشتیبانی بهترینو</a>} در
        تماس باشید.
      </Typography>
    </>
  );
}

export default CostPerClickFooterAlerts;
