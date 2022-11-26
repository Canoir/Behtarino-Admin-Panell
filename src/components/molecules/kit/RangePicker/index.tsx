import { Box, Typography } from '@mui/material';

import DatePicker from '../Datepicker';
import moment from 'moment-jalaali';
import { toast } from 'react-toastify';

type Props = {
  title: string;
  from: moment.Moment;
  to: moment.Moment;
  setFrom: (from: moment.Moment) => void;
  setTo: (to: moment.Moment) => void;
};

function RangePicker(props: Props) {
  const { from, to, setFrom, setTo, title } = props;
  //
  return (
    <Box display="flex" gap={4} mt={3} flexDirection={{ xs: 'column', md: 'row' }}>
      <Box flex="6">
        <Typography fontSize="14px">{title}</Typography>
      </Box>

      <Box flex="4" display="flex" gap={4}>
        <DatePicker
          date={from.format('jYYYY/jM/jD')}
          setDate={(fromDate) => {
            const convertedDate = moment(fromDate, 'jYYYY/jM/jD');
            if (convertedDate.isAfter(to)) {
              toast.error('تاریخ انتخابی در محدوده مناسب نمی باشد');
            } else {
              setFrom(convertedDate);
            }
          }}
          label="از تاریخ"
        />

        <DatePicker
          date={to.format('jYYYY/jM/jD')}
          setDate={(toDate) => {
            const convertedDate = moment(toDate, 'jYYYY/jM/jD');
            if (
              convertedDate.isBefore(from) ||
              convertedDate.isAfter(moment().startOf('day').add(-1, 'days'))
            ) {
              toast.error('تاریخ انتخابی در محدوده مناسب نمی باشد');
            } else {
              setTo(convertedDate);
            }
          }}
          label="تا تاریخ"
        />
      </Box>
    </Box>
  );
}

export default RangePicker;
