import AdsLineChart from '@components/molecules/Ads/LineChart';
import { Box } from '@mui/material';
import { BusinessReportType } from '@typings/Business';
import { NoData } from '@components/molecules/kit/NoData';
import { memo } from 'react';

type Props = {
  businessReport: BusinessReportType[];
  startDate: moment.Moment;
  endDate: moment.Moment;
};

function AdsCallRequestTab(props: Props) {
  if (props.businessReport.length <= 0) return <NoData />;

  return (
    <Box>
      <AdsLineChart
        reports={props.businessReport}
        startDate={props.startDate}
        endDate={props.endDate}
      />
    </Box>
  );
}

export default memo(AdsCallRequestTab);
