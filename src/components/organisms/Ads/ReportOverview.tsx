import { Box, Button, Divider, Grid, Card as MaterialCard, Typography } from '@mui/material';

import Card from '@components/molecules/kit/Card';
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import { Fragment } from 'react';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { ROUTES } from '@constants/routes';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import useAdsReport from '@hooks/api/useAdsReport';
import useBusinessOverallReport from '@hooks/api/useBusinessOverallReport';
import { useNavigate } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';

const items = [
  {
    title: 'تعداد کلیک روی کارت کسب‌و‌کار شما',
    icon: <TouchAppOutlinedIcon color="secondary" />
  },
  {
    title: 'تعداد کلیک مسیریابی',
    icon: <DirectionsOutlinedIcon color="secondary" />
  },
  {
    title: 'تعداد کلیک درخواست تماس',
    icon: <PhoneOutlinedIcon color="secondary" />
  }
];

const AdsReportOverview = () => {
  const theme = useTheme();
  const router = useNavigate();
  const { data: adsReport } = useAdsReport();
  const { data: overAllAnalytic } = useBusinessOverallReport();

  return (
    <Box>
      <MaterialCard
        sx={{
          backgroundColor: adsReport?.is_active ? 'success.lighter' : 'error.lighter',
          mb: 3,
          minHeight: '31px',
          borderLeft:
            '4px solid' +
            (adsReport?.is_active ? theme?.palette.success.dark : theme?.palette.error.dark)
        }}>
        <Grid container sx={{ py: 2, px: 4 }}>
          <Button
            id="behtarino--admin--adsBtn"
            fullWidth
            sx={{ p: 0, textAlign: 'left' }}
            onClick={() => router(ROUTES.ADS_SETTINGS)}>
            <Grid item xs>
              <Typography fontWeight={500} color="text.primary">
                وضعیت تبلیغات کسب‌و‌کار شما:
              </Typography>
            </Grid>

            <Grid item xs={4} md={2}>
              <Typography fontWeight={800} textAlign="end" color="text.primary">
                {adsReport?.is_active ? 'فعال' : 'غیر فعال'}
              </Typography>
            </Grid>
          </Button>
        </Grid>
      </MaterialCard>
      <Card sx={{ py: 2 }}>
        {items.map(({ title, icon }, mapIndex) => (
          <Fragment key={mapIndex}>
            <Grid
              container
              display="flex"
              justifyContent="center"
              alignItems="center"
              px={2}
              py={1}>
              <Grid item xs={1}>
                {icon}
              </Grid>
              <Grid item xs>
                <Typography fontSize={14}>{title}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography fontSize={14} color="text.secondary" textAlign="end">
                  {overAllAnalytic?.find((item) => Number(item.click_type) === mapIndex)
                    ?.click_count || 0}
                </Typography>
              </Grid>
            </Grid>

            {mapIndex < items.length - 1 && <Divider />}
          </Fragment>
        ))}
      </Card>
    </Box>
  );
};
export default AdsReportOverview;
