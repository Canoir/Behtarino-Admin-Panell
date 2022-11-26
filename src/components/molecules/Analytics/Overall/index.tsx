import AnalyticsOverallInfo from './Info';
import { Box } from '@mui/material';
import { Responsive } from '@components/molecules/kit/Responsive';

type Props = { from: moment.Moment; to: moment.Moment };
function AnalyticsOverall(props: Props) {
  const { from, to } = props;
  //
  return (
    <>
      <Responsive.NotDesktop>
        <AnalyticsOverallInfo
          fromDate={from}
          toDate={to}
          selectedKeys={[
            'pageViews',
            'rankClicks',
            'callRequests',
            'callRequestsOnPageClick',
            'whatsappClicks',
            'imageviewClicks',
            'websiteClicks',
            'averagePositions'
          ]}
        />
      </Responsive.NotDesktop>

      <Responsive.Desktop>
        <Box display="flex" mt={4} gap={3}>
          <Box flex="1">
            <AnalyticsOverallInfo
              fromDate={from}
              toDate={to}
              selectedKeys={['pageViews', 'rankClicks', 'callRequests', 'callRequestsOnPageClick']}
            />
          </Box>

          <Box flex="1">
            <AnalyticsOverallInfo
              fromDate={from}
              toDate={to}
              selectedKeys={[
                'whatsappClicks',
                'imageviewClicks',
                'websiteClicks',
                'averagePositions'
              ]}
            />
          </Box>
        </Box>
      </Responsive.Desktop>
    </>
  );
}

export default AnalyticsOverall;
