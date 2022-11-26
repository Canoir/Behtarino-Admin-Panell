import Box from '@mui/material/Box';
import { DeleteOutlined } from '@mui/icons-material';
import EditBusinessWorkingHoursOverlayShiftBound from './Bounds';
import IconButton from '@mui/material/IconButton';
import { WorkingHoursDayType } from '@typings/WorkingHours';

type Props = {
  from?: string;
  to?: string;
  disabled?: boolean;
  onChange: (shift: WorkingHoursDayType) => void;
  onDelete: () => void;
};
export default function EditBusinessWorkingHoursOverlayShift(props: Props) {
  const { from, to, onChange, onDelete, disabled = false } = props || {};

  return (
    <Box display="flex" alignItems="center" gap="2">
      <Box width="calc(100% - 2rem)">
        <Box display="flex" gap={2}>
          <Box width="50%">
            <EditBusinessWorkingHoursOverlayShiftBound
              isStart
              value={from}
              disabled={disabled}
              onChange={(_boundValue) => onChange({ from, to, ..._boundValue })}
            />
          </Box>

          <Box width="50%">
            <EditBusinessWorkingHoursOverlayShiftBound
              value={to}
              disabled={disabled}
              onChange={(_boundValue) => onChange({ from, to, ..._boundValue })}
            />
          </Box>
        </Box>
      </Box>
      <Box width="2rem">
        <IconButton color="primary" onClick={onDelete} disabled={disabled}>
          <DeleteOutlined fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
