import { Box, Typography } from '@mui/material';
import { Case, Default, Switch } from 'react-if';

import { Loader } from '@components/atoms/Loader';
import { NoData } from '@components/molecules/kit/NoData';
import { VirtualizedTable } from '@components/atoms/VirtualizedTable';
import moment from 'moment-jalaali';
import useAveragePositionDetails from '@hooks/api/useAveragePositionDetails';

type Props = { from: moment.Moment; to: moment.Moment };
function AnalyticsTableTab(props: Props) {
  const { from, to } = props;
  const { data, isLoading } = useAveragePositionDetails(from, to);
  console.log(isLoading);
  
  //
  return (
    <Box display="flex" flexDirection="column" gap={8}>
      <Switch>
        <Case condition={isLoading}>
          <Loader height="200px" />
        </Case>

        <Case condition={!data?.length}>
          <NoData />
        </Case>

        <Default>
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
              rowCount={Object.keys(data || {}).length}
              columns={[
                {
                  dataKey: 'rankpage',
                  label: 'عنوان صفحه',
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
                  dataKey: 'avg_pos',
                  label: 'میانگین جایگاه',
                  width: 200,
                  render: (cellData) => <span>{(cellData as number)?.toFixed?.(2) || 0}</span>
                },
                {
                  label: 'تعداد کلیک',
                  dataKey: 'click_count',
                  width: 200
                }
              ]}
              getRowData={(index) => data![index]}
            />
          </Box>
        </Default>
      </Switch>
    </Box>
  );
}

export default AnalyticsTableTab;
