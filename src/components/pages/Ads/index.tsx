import AdsAnalytics from '@components/organisms/Ads/Analytics';
import AdsBalance from '@components/organisms/Ads/Balance';
import AdsReportOverview from '@components/organisms/Ads/ReportOverview';
import { Grid } from '@mui/material';

const AdsPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <AdsReportOverview />
      </Grid>
      <Grid item xs={12} md={6}>
        <AdsBalance />
      </Grid>
      <Grid item xs={12}>
        <AdsAnalytics />
      </Grid>
    </Grid>
  );
};
export default AdsPage;
