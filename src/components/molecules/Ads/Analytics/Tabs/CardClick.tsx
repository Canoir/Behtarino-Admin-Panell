import { Box, Typography } from '@mui/material';
import { BusinessReportDetailsPagePerKey, BusinessReportType } from '@typings/Business';
import { memo, useMemo, useState } from 'react';

import AdsLineChart from '@components/molecules/Ads/LineChart';
import { AnalyticsHelper } from '@helpers/analytics';
import { CARD_CLICK } from '@constants/test';
import { NoData } from '@components/molecules/kit/NoData';
import { VirtualizedTable } from '@components/atoms/VirtualizedTable';
import _orderBy from 'lodash/orderBy';
import _sumBy from 'lodash/sumBy';
import { numberToPriceFormat } from '@utils/Numbers';
import useDeepEffect from '@hooks/useDeepEffect';

type Props = {
  businessReport: BusinessReportType[];
  startDate: moment.Moment;
  endDate: moment.Moment;
};

function AdsCardClickTab(props: Props) {
  const [businessReportsDetailsSingle, setBusinessReportsDetailsSingle] =
    useState<BusinessReportDetailsPagePerKey>();

  useDeepEffect(() => {
    const separatedDetails = props.businessReport?.reduce<BusinessReportDetailsPagePerKey>(
      AnalyticsHelper.businessReportReducer,
      {}
    );

    setBusinessReportsDetailsSingle(separatedDetails);
  }, [props]);

  const tableValues = useMemo(
    () => _orderBy(Object.values(businessReportsDetailsSingle || {}), ['count'], ['desc']),
    [businessReportsDetailsSingle]
  );

  const filteredClickSum = _sumBy(tableValues, 'count');

  const filteredCostSum = _sumBy(tableValues, 'cost');

  if (props.businessReport.length <= 0) return <NoData />;

  return (
    <Box>
      <AdsLineChart
        reports={props.businessReport}
        startDate={props.startDate}
        endDate={props.endDate}
      />

      <Box
        border="1px solid grey"
        mt={16}
        borderRadius={1}
        height="500px"
        overflow="hidden"
        sx={{ direction: 'ltr' }}>
        <VirtualizedTable
          headerHeight={50}
          rowHeight={40}
          rowCount={Object.keys(businessReportsDetailsSingle || {}).length}
          columns={[
            {
              dataKey: 'previous_page',
              label: 'کلیدواژه و محله ',
              width: 500,
              render: (cellData) => (
                <Typography
                  sx={{
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    direction: 'ltr',
                    textAlign: 'right'
                  }}>
                  {decodeURIComponent(cellData as string)}
                </Typography>
              )
            },
            {
              dataKey: 'cost',
              label: 'میانگین هزینه',
              width: 200,
              render: (cellData) => <span>{numberToPriceFormat((cellData as number) || 0)}</span>
            },
            {
              label: 'تعداد کلیک',
              dataKey: 'count',
              width: 200
            }
          ]}
          getRowData={(index) => tableValues[index]}
        />
      </Box>

      <Box display="flex" mt={3}>
        <Box flex="1"></Box>

        <Box flex="1" display="flex">
          <Box flex="1" display="flex" justifyContent="space-between" px={1}>
            <Typography data-testid={CARD_CLICK.footerTitle} fontSize="14px">
              مجموع هزینه‌ها:
            </Typography>
            <Typography fontSize="14px" fontWeight={600}>
              {numberToPriceFormat(filteredCostSum)}
            </Typography>
          </Box>

          <Box flex="1" display="flex" justifyContent="space-between" px={1}>
            <Typography data-testid={CARD_CLICK.footerTitle} fontSize="14px">
              مجموع کلیک‌ها:
            </Typography>
            <Typography fontSize="14px" fontWeight={600}>
              {filteredClickSum} کلیک
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(AdsCardClickTab);
