import { Divider, Grid, Typography } from '@mui/material';

import { AdsCostPerClickOverlay } from '@components/molecules/Ads/Setting/Overlay/CostPerClick';
import { AdsMapRangeOverlay } from '@components/molecules/Ads/Setting/Overlay/MapRange';
import Card from '@components/molecules/kit/Card';
import MainInfoItem from '@components/molecules/Setting/MainInfoItem';
import { Responsive } from '@components/molecules/kit/Responsive';
import { numberToPriceFormat } from '@utils/Numbers';
import useAdsReport from '@hooks/api/useAdsReport';

const AdsSettingInfo = () => {
  const { data: adsReport } = useAdsReport();
  const { balance, radius, max_click_price } = adsReport || { balance: 0 };

  return (
    <>
      <Card title="تنظیمات تبلیغات">
        <Grid container>
          <MainInfoItem
            id="behtarino--admin--adsSettingRange"
            Overlay={AdsMapRangeOverlay}
            disabled={balance <= 0}
            noDivider
            title="محدوده نمایش تبلیغات :"
            content={
              <Typography color="text.secondary">
                {radius ? `${radius} کیلومتر ` : 'محدوده مشخص نشده'}
              </Typography>
            }
          />

          <Responsive.Mobile>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Responsive.Mobile>

          <MainInfoItem
            id="behtarino--admin--adsSettingMax"
            disabled={balance <= 0}
            Overlay={AdsCostPerClickOverlay}
            noDivider
            title="حداکثر هزینه‌ی کلیک روی تبلیغات :"
            content={
              <Typography color="text.secondary">
                {max_click_price ? `${numberToPriceFormat(max_click_price)}` : 'حداکثری مشخص نشده'}
              </Typography>
            }
          />
        </Grid>
      </Card>
    </>
  );
};
export default AdsSettingInfo;
