import { Slider } from '@mui/material';

type Props = { range: number; setRange: (num: number) => void; isError: boolean };
function MapRangeOverlaySlider(props: Props) {
  const { isError: isNewRangePriceMoreThanSelectedRangePrice, range, setRange } = props;
  //
  return (
    <Slider
      value={-range}
      onChange={(e, value) => {
        setRange(-value as number);
      }}
      step={-0.1}
      min={-20}
      scale={(x) => -x}
      max={-2}
      // MUI Bug for not adding error color to Slider Colors!
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      color={(isNewRangePriceMoreThanSelectedRangePrice ? 'error' : 'primary') as any}
      valueLabelDisplay="on"
      track="inverted"
      marks={[
        {
          value: -2,
          label: '۲ کیلومتر'
        },
        {
          value: -20,
          label: '۲۰ کیلومتر'
        }
      ]}
    />
  );
}

export default MapRangeOverlaySlider;
