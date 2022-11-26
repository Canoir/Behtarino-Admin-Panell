import { Slider } from '@mui/material';
import { calculatePriceRange } from '@helpers/ads';
import useAdsReport from '@hooks/api/useAdsReport';
import { useMemo } from 'react';

type Props = { range: number; setRange: (num: number) => void };
function CostPerClickOverlaySlider(props: Props) {
  const { range, setRange } = props;

  const { data: adsReport } = useAdsReport();

  const { radius, subscription_type } = adsReport || {};

  const calculatedRangePrice = useMemo(
    () => calculatePriceRange(radius || 0, subscription_type),
    [radius]
  );

  const isRatePerClickMoreThanRadiusCosts = calculatedRangePrice <= (range || 0);
  //
  return (
    <Slider
      value={-range}
      onChange={(e, value) => {
        setRange(-value as number);
      }}
      step={(range || 0) < 20_000 ? -500 : -1_000}
      min={-150_000}
      max={-1_500}
      scale={(x) => -x}
      // MUI Bug for not adding error color to Slider Colors!
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      color={(isRatePerClickMoreThanRadiusCosts ? 'primary' : 'error') as any}
      valueLabelDisplay="on"
      track="inverted"
      marks={[
        {
          value: -1_500,
          label: '۱,۵۰۰ تومان'
        },
        {
          value: -150_000,
          label: '۱۵۰,۰۰۰ تومان'
        }
      ]}
    />
  );
}

export default CostPerClickOverlaySlider;
