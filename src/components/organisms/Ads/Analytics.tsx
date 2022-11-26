import { Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

import AdsCallRequestTab from '@components/molecules/Ads/Analytics/Tabs/CallRequest';
import AdsCardClickTab from '@components/molecules/Ads/Analytics/Tabs/CardClick';
import AdsNavigationTab from '@components/molecules/Ads/Analytics/Tabs/Navigation';
import Box from '@mui/material/Box';
import Card from '@components/molecules/kit/Card';
import Divider from '@mui/material/Divider';
import RangePicker from '@components/molecules/kit/RangePicker';
import moment from 'moment-jalaali';
import useBusinessReport from '@hooks/api/useBusinessReport';
import { useState } from 'react';

const AdsAnalytics = () => {
  const [from, setFrom] = useState<moment.Moment>(moment().startOf('day').subtract(31, 'days'));
  const [to, setTo] = useState<moment.Moment>(moment().startOf('day').subtract(1, 'days'));
  const [tabSelected, setTabSelected] = useState('0');
  //
  const { data: report } = useBusinessReport({
    startDate: from.unix(),
    endDate: to.unix(),
    currentTab: tabSelected
  });

  return (
    <Card title="تحلیل تبلیغات">
      <RangePicker
        title="تعداد کلیک‌های کاربران در بازه زمانی دلخواه‌تان روی هر کدام از قسمت‌های بیزنس شما:"
        from={from}
        to={to}
        setFrom={setFrom}
        setTo={setTo}
      />

      <Divider sx={{ mt: 3 }} />

      <TabContext value={tabSelected}>
        <Box width="100%" borderBottom={1} mt={3} borderColor="divider">
          <Tabs
            variant="fullWidth"
            value={tabSelected}
            onChange={(_, newValue) => {
              setTabSelected(newValue);
            }}>
            <Tab
              label="کلیک روی تبلیغات"
              value="0"
              id="behtarino--admin--adsTab0"
              data-testid="behtarino--admin--adsTab0"
            />
            <Tab label="بررسی مسیریابی" value="1" id="behtarino--admin--adsTab1" />
            <Tab label="بررسی شماره تماس" value="2" id="behtarino--admin--adsTab2" />
          </Tabs>
        </Box>

        <TabPanel value="0">
          <AdsCardClickTab businessReport={report || []} startDate={from} endDate={to} />
        </TabPanel>
        <TabPanel value="1">
          <AdsNavigationTab businessReport={report || []} startDate={from} endDate={to} />
        </TabPanel>
        <TabPanel value="2">
          <AdsCallRequestTab businessReport={report || []} startDate={from} endDate={to} />
        </TabPanel>
      </TabContext>
    </Card>
  );
};
export default AdsAnalytics;
