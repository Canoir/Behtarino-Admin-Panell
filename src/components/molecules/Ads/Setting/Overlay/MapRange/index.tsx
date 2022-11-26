import { Alert, Box, Typography } from '@mui/material';
import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';
import { useEffect, useState } from 'react';

import AdsServices from '@services/ads';
import Map from '@components/atoms/Map';
import MapRangeOverlaySlider from './Slider';
import { calculatePriceRange } from '@helpers/ads';
import { numberToPriceFormat } from '@utils/Numbers';
import useAdsReport from '@hooks/api/useAdsReport';
import useBusiness from '@hooks/api/useBusiness';
import useToggle from '@hooks/useToggle';

export const AdsMapRangeOverlay = ({ open, onClose }: Omit<OverlayProps, 'title' | 'children'>) => {
  const [isLoading, toggleIsLoading] = useToggle(false);
  const { data: selectedBusiness } = useBusiness();
  const { data: adsReport, refetch } = useAdsReport();

  const { radius, subscription_type, max_click_price } = adsReport || {};
  const { latitude, longitude } = selectedBusiness || {};

  const [range, setRange] = useState(2);
  const [calculatedRangePrice, setCalculatedRangePrice] = useState(0);

  const isNewRangePriceMoreThanSelectedRangePrice = calculatedRangePrice > (max_click_price || 0);

  useEffect(() => {
    if (radius) setRange(radius);
  }, [radius]);

  useEffect(() => {
    setCalculatedRangePrice(calculatePriceRange(range, subscription_type));
  }, [range]);

  const handleSubmit = () => {
    toggleIsLoading();
    AdsServices.update(selectedBusiness?.slug || '', {
      radius: range,
      max_click_price: isNewRangePriceMoreThanSelectedRangePrice
        ? +calculatedRangePrice?.toFixed(0)
        : undefined
    })
      .then(() => {
        refetch();
        onClose?.();
      })
      .finally(toggleIsLoading);
  };

  return (
    <Overlay
      title="انتخاب محدوده‌ی نمایش تبلیغات"
      open={open}
      onClose={onClose}
      ctas={[
        {
          title: 'تایید',
          onClick: handleSubmit,
          loading: isLoading
        }
      ]}>
      <Box p={5}>
        <Typography>
          می‌خواهید تبلیغات‌تان در چه محدوده‌ای از کسب‌و‌کارتان نمایش داده شود؟
        </Typography>

        <Box mt={4}>
          <Box width="100%" borderRadius={1}>
            <Map
              zoom={13 - range / 3.5}
              circleRadius={range * 1000}
              center={[latitude, longitude]}
              style={{ height: '200px' }}
            />
          </Box>
        </Box>

        <Box mt={12} px={8}>
          <MapRangeOverlaySlider
            range={range}
            setRange={setRange}
            isError={isNewRangePriceMoreThanSelectedRangePrice}
          />
        </Box>

        <Box mt={32}>
          <Alert
            severity="warning"
            sx={{ visibility: isNewRangePriceMoreThanSelectedRangePrice ? 'visible' : 'hidden' }}>
            با انتخاب این محدوده‌ی نمایش، حداکثر هزینه‌ی تبلیغات شما به‌صورت خودکار به{' '}
            {numberToPriceFormat(calculatedRangePrice)}افزایش می‌یابد.
          </Alert>
        </Box>
      </Box>
    </Overlay>
  );
};
