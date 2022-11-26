import { Box } from '@mui/material';
import RangePicker from '../kit/RangePicker';
import moment from 'moment-jalaali';

type Props = {
  from: moment.Moment;
  to: moment.Moment;
  setFrom: (from: moment.Moment) => void;
  setTo: (to: moment.Moment) => void;
};

function AnalyticsFilter(props: Props) {
  return (
    <Box>
      <RangePicker
        {...props}
        title={
          'شما می‌توانید بازخورد کاربران در بازه زمانی دلخواه‌تان روی هر کدام از قسمت‌های کسب‌و‌کار‌تان را ببینید:'
        }
      />
    </Box>
  );
}

export default AnalyticsFilter;
