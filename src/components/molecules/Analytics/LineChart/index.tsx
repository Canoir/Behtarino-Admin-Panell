import { memo, useMemo } from 'react';

import { Box } from '@mui/material';
import { Chart } from 'react-google-charts';
import moment from 'moment-jalaali';
import useTheme from '@mui/material/styles/useTheme';

type Props = {
  reports: Record<string, number>;
  startDate: moment.Moment;
  endDate: moment.Moment;
  title: string;
};

function AnalyticsLineChart(props: Props) {
  const theme = useTheme();

  const options = {
    colors: [theme.palette.secondary.main]
  };

  return (
    <Box sx={{ direction: 'rtl' }}>
      <Chart
        chartType="Line"
        width="100%"
        height="200px"
        data={useMemo(() => ChartDataGenerator(props, props.title), [props])}
        options={options}
      />
    </Box>
  );
}

function ChartDataGenerator(args: Props, title: string): (string | number)[][] {
  const { reports, startDate, endDate } = args;

  const result: (string | number)[][] = [[title, '']];
  const dayCount = endDate.diff(startDate, 'days');

  for (let i = 0; i <= dayCount; i++) {
    const startDateCondition = moment(startDate).add(i, 'days').unix();

    const endDateCondition = moment(startDate)
      .add(i + 1, 'days')
      .unix();

    const foundedItemFromReports = Object.keys(reports).find(
      (item) => moment(item).unix() <= endDateCondition && moment(item).unix() >= startDateCondition
    );

    if (foundedItemFromReports) {
      result.push([
        moment(startDate).add(i, 'days').format('dddd jD jMMMM'),
        reports[foundedItemFromReports]
      ]);
    } else result.push([moment(startDate).add(i, 'days').format('dddd jD jMMMM'), 0]);
  }

  return result;
}

export default memo(AnalyticsLineChart);
