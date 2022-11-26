import { Box, Typography } from '@mui/material';
import { Case, Default, Switch } from 'react-if';

import AdsLineChart from '@components/molecules/Ads/LineChart';
import Card from '@components/molecules/kit/Card';
import { Loader } from '@components/atoms/Loader';
import { NoData } from '@components/molecules/kit/NoData';
import moment from 'moment-jalaali';
import useBusinessReport from '@hooks/api/useBusinessReport';
import { useMemo } from 'react';

export function CurrentSubscriptionChart() {
  const fromDate = useMemo(() => moment().startOf('day').subtract(31, 'days'), []);
  const toDate = useMemo(() => moment().startOf('day').subtract(1, 'days'), []);

  const { data: report, isLoading } = useBusinessReport({
    startDate: fromDate.unix(),
    endDate: toDate.unix(),
    currentTab: '0'
  });

  const isReportContainData = !report || report?.length === 0;
  return (
    <Card title="تعداد کلیک ها روی کسب و کار" sx={{ mt: 5 }}>
      <Box px={{ md: 5 }} py={3}>
        <Typography>تاثیر خرید عضویت بر تعداد کلیک روی کارت کسب‌و‌کار شما:</Typography>

        <Switch>
          <Case condition={isReportContainData}>
            <NoData />
          </Case>

          <Case condition={isLoading}>
            <Loader />
          </Case>

          <Default>
            <AdsLineChart reports={report || []} startDate={fromDate} endDate={toDate} />
          </Default>
        </Switch>
      </Box>
    </Card>
  );
}
