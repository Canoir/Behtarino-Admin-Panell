import { Box, Typography } from '@mui/material';
import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';

import AdsServices from '@services/ads';
import CostPerClickFooterAlerts from './Alerts';
import CostPerClickOverlaySlider from './Slider';
import useAdsReport from '@hooks/api/useAdsReport';
import useBusiness from '@hooks/api/useBusiness';
import { useState } from 'react';
import useToggle from '@hooks/useToggle';

export const AdsCostPerClickOverlay = ({
  open,
  onClose
}: Omit<OverlayProps, 'title' | 'children'>) => {
  const [isLoading, toggleIsLoading] = useToggle(false);

  const { data: selectedBusiness } = useBusiness();
  const { data: adsReport, refetch } = useAdsReport();

  const { max_click_price } = adsReport || {};

  const [range, setRange] = useState(max_click_price || 0);

  const handleSubmit = () => {
    toggleIsLoading();
    AdsServices.update(selectedBusiness?.slug || '', {
      max_click_price: +(range || 0)?.toFixed(0)
    })
      .then(() => {
        refetch();
        onClose?.();
      })
      .finally(toggleIsLoading);
  };

  return (
    <Overlay
      title="انتخاب حداکثر هزینه‌ی احتمالی برای هر کلیک"
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
        <Typography display="inline">
          حداکثر هزینه‌ای که برای هر کلیک از شارژ تبلیغات‌تان کم می‌شود را انتخاب کنید.{' '}
        </Typography>

        <Typography color="text.secondary" fontSize="12px" display="inline">
          (هزینه‌ی هر کلیک با توجه به منطقه‌ی تبلیغات و رقیب‌های‌تان، متغیر است)
        </Typography>

        <Box mt={12} px={8}>
          <CostPerClickOverlaySlider range={range} setRange={setRange} />
        </Box>

        <CostPerClickFooterAlerts range={range} slug={selectedBusiness?.slug} />
      </Box>
    </Overlay>
  );
};
