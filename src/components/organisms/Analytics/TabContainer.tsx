import { Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

import AnalyticsChartsTab from './Tab/Charts';
import AnalyticsTableTab from './Tab/Table';
import { useState } from 'react';

type Props = { from: moment.Moment; to: moment.Moment };
function AnalyticsTabContainer(props: Props) {
  const [tabSelected, setTabSelected] = useState('0');
  //
  return (
    <Box mt={3}>
      <TabContext value={tabSelected}>
        <Box width="100%" borderBottom={1} borderColor="divider">
          <Tabs
            variant="fullWidth"
            value={tabSelected}
            onChange={(_, newValue) => {
              setTabSelected(newValue);
            }}>
            <Tab label="نمودار ها" value="0" />
            <Tab label="جدول اطلاعات" value="1" />
          </Tabs>
        </Box>

        <TabPanel value="0">
          <AnalyticsChartsTab from={props.from} to={props.to} />
        </TabPanel>
        <TabPanel value="1">
          <AnalyticsTableTab from={props.from} to={props.to} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default AnalyticsTabContainer;
