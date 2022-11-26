import { AnalyticsAvailableKeys, AnalyticsOverallItems } from '@constants/analytics';
import { Divider, Grid, Typography } from '@mui/material';

import { ANALYTICS_OVERALL_INFO } from '@constants/test';
import Card from '@components/molecules/kit/Card';
import { Fragment } from 'react';
import moment from 'moment-jalaali';
import useBusinessAnalytics from '@hooks/api/BusinessAnalytics';

type Props = {
  selectedKeys: AnalyticsAvailableKeys[];
  fromDate: moment.Moment;
  toDate: moment.Moment;
};
function AnalyticsOverallInfo(props: Props) {
  const { selectedKeys, fromDate, toDate } = props;

  const data = useBusinessAnalytics(fromDate, toDate);
  //
  return (
    <Card sx={{ py: 2, mt: 4 }}>
      {selectedKeys.map((key, mapIndex) => {
        const { icon, title } = AnalyticsOverallItems[key];
        return (
          <Fragment key={mapIndex}>
            <Grid
              container
              display="flex"
              justifyContent="center"
              alignItems="center"
              px={2}
              gap={1}
              py={1}>
              <Grid item xs={1}>
                {icon}
              </Grid>
              <Grid item xs>
                <Typography data-testid={ANALYTICS_OVERALL_INFO.title} fontSize={14}>
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography
                  fontSize={14}
                  color="text.secondary"
                  textAlign="end"
                  data-testid={ANALYTICS_OVERALL_INFO.value}>
                  {data[key].isLoading ? '...' : data[key].overall()}
                </Typography>
              </Grid>
            </Grid>

            {mapIndex < selectedKeys.length - 1 && <Divider />}
          </Fragment>
        );
      })}
    </Card>
  );
}

export default AnalyticsOverallInfo;
