import { AnalyticsChartsItems, AnalyticsChartsKeys } from '@constants/analytics';
import { Else, If, Then } from 'react-if';

import AnalyticsLineChart from '@components/molecules/Analytics/LineChart';
import { Box } from '@mui/material';
import { Fragment } from 'react';
import { Loader } from '@components/atoms/Loader';
import moment from 'moment-jalaali';
import useBusinessAnalytics from '@hooks/api/BusinessAnalytics';

type Props = { from: moment.Moment; to: moment.Moment };
function AnalyticsChartsTab(props: Props) {
  const { from, to } = props;
  const data = useBusinessAnalytics(from, to);
  //
  return (
    <Box display="flex" flexDirection="column" gap={8} pt={3}>
      {Object.keys(AnalyticsChartsItems).map((key) => (
        <Fragment key={key}>
          <If condition={data[key as AnalyticsChartsKeys].isLoading}>
            <Then>
              <Loader height="100px" />
            </Then>
            <Else>
              <AnalyticsLineChart
                reports={data[key as AnalyticsChartsKeys].data || {}}
                endDate={to}
                startDate={from}
                title={AnalyticsChartsItems[key as AnalyticsChartsKeys].title}
              />
            </Else>
          </If>
        </Fragment>
      ))}
    </Box>
  );
}

export default AnalyticsChartsTab;
