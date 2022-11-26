import { memo, useMemo } from 'react';

import { Box } from '@mui/material';
import { BusinessReportType } from '@typings/Business';
import { Chart } from 'react-google-charts';
import moment from 'moment-jalaali';
import useTheme from '@mui/material/styles/useTheme';

//TODO: Merge Charts
type Props = { reports: BusinessReportType[]; startDate: moment.Moment; endDate: moment.Moment };

function AdsLineChart(props: Props) {
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
        data={useMemo(() => ChartDataGenerator(props), [props])}
        options={options}
      />
    </Box>
  );
}

function ChartDataGenerator(args: Props): (string | number)[][] {
  const { reports, startDate, endDate } = args;

  const result: (string | number)[][] = [['تاریخ', '']];
  const dayCount = endDate.diff(startDate, 'days');

  for (let i = 0; i <= dayCount; i++) {
    const startDateCondition = moment(startDate).add(i, 'days').unix();

    const endDateCondition = moment(startDate)
      .add(i + 1, 'days')
      .unix();

    const foundedItemFromReports = reports.find(
      (item) => item.timestamp <= endDateCondition && item.timestamp >= startDateCondition
    );

    if (foundedItemFromReports) {
      result.push([
        moment(startDate).add(i, 'days').format('dddd jD jMMMM'),
        foundedItemFromReports.click_count
      ]);
    } else result.push([moment(startDate).add(i, 'days').format('dddd jD jMMMM'), 0]);
  }

  return result;
}

export default memo(AdsLineChart);
