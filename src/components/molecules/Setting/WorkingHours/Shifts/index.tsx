import { Checkbox, Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditBusinessWorkingHoursOverlayShift from './Item';
import FormControlLabel from '@mui/material/FormControlLabel';
import { WorkingHoursDayType } from '@typings/WorkingHours';
import { useState } from 'react';

type Props = {
  shifts: WorkingHoursDayType[] | null;
  setShifts: (shifts: WorkingHoursDayType[] | null) => void;
};
export default function EditBusinessWorkingHoursOverlayShifts(props: Props) {
  const { shifts, setShifts } = props || {};

  const [checked, setChecked] = useState<'Holiday' | '24 Hours' | 'None'>('None');

  const onChangeShift = (_shift: WorkingHoursDayType, i: number) => {
    const _shifts = [...(shifts || [])];

    if (_shifts) {
      _shifts[i] = _shift;
      setShifts(_shifts);
    }
  };

  const onDeleteShift = (index: number) => {
    if (shifts) {
      const _shifts = shifts.filter((item, i) => i !== index);
      setShifts(_shifts);
    }
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {shifts?.map((shift, i) => (
          <EditBusinessWorkingHoursOverlayShift
            key={Math.random()}
            {...shift}
            disabled={checked !== 'None'}
            onChange={(_shift: WorkingHoursDayType) => onChangeShift(_shift, i)}
            onDelete={() => onDeleteShift(i)}
          />
        ))}
        <Button
          disabled={checked !== 'None'}
          sx={{ alignSelf: 'start' }}
          color="primary"
          onClick={() => setShifts([...(shifts || []), { from: undefined, to: undefined }])}>
          <AddIcon fontSize="small" sx={{ mr: 2 }} />
          <Typography fontSize="12px">افزودن ساعت کاری</Typography>
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" width="66%">
        <FormControlLabel
          control={
            <Checkbox
              checked={checked === '24 Hours'}
              onChange={(e) => {
                setChecked(e.target.checked ? '24 Hours' : 'None');
                setShifts(e.target.checked ? [{ from: '00:00:00', to: '23:59:00' }] : []);
              }}
            />
          }
          label="شبانه روزی"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={checked === 'Holiday'}
              onChange={(e) => {
                setChecked(e.target.checked ? 'Holiday' : 'None');
                setShifts(e.target.checked ? null : []);
              }}
            />
          }
          label="روز تعطیل"
        />
      </Box>
    </Box>
  );
}
