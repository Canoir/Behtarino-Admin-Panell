import AnalyticsFilter from '@components/molecules/Analytics/Filter';
import AnalyticsOverall from '@components/molecules/Analytics/Overall';
import AnalyticsTabContainer from '@components/organisms/Analytics/TabContainer';
import Box from '@mui/material/Box';
import Card from '@components/molecules/kit/Card';
import moment from 'moment-jalaali';
import { useState } from 'react';

const AnalyticsPage = () => {
  const [from, setFrom] = useState<moment.Moment>(moment().startOf('day').subtract(31, 'days'));
  const [to, setTo] = useState<moment.Moment>(moment().startOf('day').subtract(1, 'days'));

  return (
    <Box>
      <Card title="تحلیل کسب‌وکار">
        <Box>
          <AnalyticsFilter to={to} from={from} setFrom={setFrom} setTo={setTo} />

          <AnalyticsOverall to={to} from={from} />
        </Box>

        <AnalyticsTabContainer from={from} to={to} />
      </Card>
    </Box>
  );
};
export default AnalyticsPage;
