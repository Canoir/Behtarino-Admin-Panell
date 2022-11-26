import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DATE_PICKER } from '@constants/test';
import ItemPicker from './ItemPicker';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Overlay from '@components/molecules/kit/Overlay';
import Typography from '@mui/material/Typography';
import __range from 'lodash/range';
import moment from 'moment-jalaali';
import { monthsData } from '@constants/date';
import useToggle from '@hooks/useToggle';

type DatePickerProps = {
  date: string;
  setDate: (date: string) => void;
  label?: string;
  id?: string;
};

const DatePicker = ({ date, setDate, label = 'تاریخ', id }: DatePickerProps) => {
  const [open, toggleModal] = useToggle(false);
  const [tempDate, setTempDate] = useState(date);
  const dateObject = useMemo(() => moment(tempDate, 'jYYYY/jM/jD'), [tempDate]);

  return (
    <>
      <Button
        id={id}
        variant="outlined"
        color="primary"
        onClick={toggleModal}
        size="large"
        endIcon={<KeyboardArrowDown />}
        sx={{ minWidth: 120, flexShrink: 0, flex: 1 }}>
        <Typography
          flex={1}
          fontWeight="bold"
          align="left"
          fontSize="small"
          data-testid={DATE_PICKER.openButton}>{`${label}: ${date}`}</Typography>
      </Button>

      <Overlay
        ctas={[
          {
            title: 'تایید',
            onClick: () => {
              setDate(tempDate);
              toggleModal();
            }
          }
        ]}
        open={open}
        onClose={toggleModal}
        title="انتخاب تاریخ شروع">
        <Box p={4} display="flex" alignItems="center" justifyContent="space-around">
          <ItemPicker
            onChange={(date) => {
              dateObject.jDate(date + 1);
              setTempDate(dateObject.format('jYYYY/jM/jD'));
            }}
            value={dateObject.jDate()}
            items={__range(1, monthsData[dateObject.jMonth()].numOfDays + 1)}
          />

          <ItemPicker
            onChange={(month) => {
              dateObject.jMonth(month);
              setTempDate(dateObject.format('jYYYY/jM/jD'));
            }}
            value={dateObject.format('jMMMM')}
            items={monthsData.map(({ name }) => name)}
          />

          <ItemPicker
            onChange={(year) => {
              dateObject.jYear(year + 1398);
              setTempDate(dateObject.format('jYYYY/jM/jD'));
            }}
            value={dateObject.jYear()}
            items={__range(1398, 1402)}
          />
        </Box>
      </Overlay>
    </>
  );
};
export default DatePicker;
