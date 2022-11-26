import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { WorkingHoursDayType } from '@typings/WorkingHours';
import __padStart from 'lodash/padStart';
import __range from 'lodash/range';
import { useMemo } from 'react';

type Props = {
  isStart?: boolean;
  value: string | undefined;
  disabled?: boolean;
  onChange: (shift: WorkingHoursDayType) => void;
};
export default function EditBusinessWorkingHoursOverlayShiftBound(props: Props) {
  const { isStart, value, onChange, disabled = false } = props || {};

  const boundsData = useMemo(
    () => [
      ...__range(24).reduce((acc: string[], cv) => {
        const hh = __padStart(String(cv), 2, '0');
        acc.push(`${hh}:00`, `${hh}:30`);
        return acc;
      }, []),
      '23:59'
    ],
    []
  );

  return (
    <Box>
      <Select
        disabled={disabled}
        MenuProps={{ sx: { maxHeight: 300 } }}
        fullWidth
        size="small"
        placeholder={isStart ? 'ساعت شروع' : 'ساعت پایان'}
        value={value}
        onChange={(e) => onChange({ [isStart ? 'from' : 'to']: e.target.value })}>
        {boundsData?.map?.((bound, index) => (
          <MenuItem key={index} value={`${bound}:00`}>
            {bound}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
