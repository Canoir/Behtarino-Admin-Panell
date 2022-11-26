import AdsSettingFAQ from '@components/organisms/Ads/Setting/FAQ';
import AdsSettingInfo from '@components/organisms/Ads/Setting/Info';
import AdsSettingStatus from '@components/organisms/Ads/Setting/Status';
import { Grid } from '@mui/material';

const AdsSettingPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <AdsSettingStatus />
      </Grid>

      <Grid item xs={12}>
        <AdsSettingInfo />
      </Grid>

      <Grid item xs={12}>
        <AdsSettingFAQ />
      </Grid>
    </Grid>
  );
};
export default AdsSettingPage;
