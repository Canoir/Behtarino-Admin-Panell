import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  Typography,
  circularProgressClasses,
  useTheme
} from '@mui/material';
import { Case, Switch } from 'react-if';
import {
  ChevronLeftOutlined,
  CommentOutlined,
  StarOutlineOutlined
} from '@mui/icons-material';

import Box from '@mui/material/Box';
import Card from '@components/molecules/kit/Card';
import { DescriptionItem } from '@components/atoms/DescriptionItem';
import QR from 'qrcode';
import QRTemplate from '@assets/png/qr/template.png';
import { ROUTES } from '@constants/routes';
import jsPDF from 'jspdf';
import moment from 'moment-jalaali';
import { nthNumbers } from '@constants/numbers';
import { numberToPriceFormat } from '@utils/Numbers';
import useAdsReport from '@hooks/api/useAdsReport';
import useAnalytics from '@hooks/api/useAnalytics';
import useBusiness from '@hooks/api/useBusiness';
import useBusinessFullDetails from '@hooks/api/useBusinessFullDetails';
import { useCheckStep } from '@hooks/useCheckStep';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useSubscription from '@hooks/api/useSubscription';
import useSubscriptionOffer from '@hooks/useSubscriptionOffer';

// TODO: Separate this component to another file
//!FLAG: UNCLEAN
const HomePage = () => {
  const { data: selectedBusiness } = useBusiness();
  const { data: businessFullDetails } = useBusinessFullDetails();
  const { data: adsReport } = useAdsReport();
  const { data: currentSubscription } = useSubscription();

  const fromDate = useMemo(() => moment().startOf('day').subtract(31, 'days'), []);
  const toDate = useMemo(() => moment().startOf('day').subtract(1, 'days'), []);

  const { data: views, clickPriceData } = useAnalytics(fromDate.unix(), toDate.unix());

  const viewsNumber = useMemo(
    () => views && Object.values(views).reduce((acc, curr) => acc + curr, 0),
    [views, selectedBusiness, businessFullDetails]
  );

  console.log(viewsNumber, { views, selectedBusiness, businessFullDetails });
  

  const { step, stepsInfo } = useCheckStep();

  const { suggestData } = useSubscriptionOffer();

  const navigate = useNavigate();
  const theme = useTheme();

  const hasProvokingMessage =
    clickPriceData && businessFullDetails?.main_tag && !adsReport?.is_active;

  const hasSubscription = currentSubscription?.subscription_details?.plan !== 'free';

  return (
    <>
      {process.env.REACT_APP_NAME}
      <Box sx={{ pt: { md: 16 }, pl: { md: 8 } }}>
        <Typography fontSize="22px" lineHeight="44px">
          {selectedBusiness?.title}
        </Typography>

        <Typography fontSize="18px" color="text.secondary" lineHeight="38px">
          خوش آمدید
        </Typography>
      </Box>

      <Paper sx={{ mt: 2 }}>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
          <Box
            flex="1"
            display="flex"
            justifyContent="flex-start"
            alignItems="start"
            gap={4}
            mt={8}
            mb={4}
            px={{ xs: 4, md: 0 }}
            pl={{ xs: 4, md: 8 }}
            flexDirection="column">
            {suggestData?.price ? (
              <Alert sx={{ display: { xs: undefined, md: 'none' } }} severity="info">
                <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
                  <Typography fontSize={12}>
                    همین حالا عضویت کسب‌وکار خود را تمدید کنید تا{' '}
                    {
                      <Typography display="inline" fontWeight="bold" fontSize={12}>
                        {numberToPriceFormat(suggestData.price)}
                      </Typography>
                    }{' '}
                    شارژ تبلیغات هدیه بگیرید.
                  </Typography>

                  <Button
                    endIcon={<ChevronLeftOutlined />}
                    onClick={() => {
                      navigate(ROUTES.RENEWAL);
                    }}>
                    تمدید عضویت
                  </Button>
                </Box>
              </Alert>
            ) : null}

            <Box display="flex" gap={6} alignItems="center">
              <Box sx={{ position: 'relative', display: 'inline-flex' }} width={60} height={60}>
                <CircularProgress
                  thickness={6}
                  sx={{
                    color: (theme) => theme.palette.grey[200],
                    position: 'absolute',
                    left: 0
                  }}
                  variant="determinate"
                  value={100}
                  size={80}
                />

                <CircularProgress
                  variant="determinate"
                  disableShrink
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses?.circle}`]: {
                      strokeLinecap: 'round'
                    }
                  }}
                  value={((step?.length || 0) / stepsInfo.length) * 100}
                  size={80}
                  thickness={6}
                />

                <Box
                  sx={{
                    height: '42px',
                    top: 'calc(100% - 42px)',
                    left: 'calc(100% - 42px)',
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Typography variant="caption" component="div" color="text.secondary">
                    {((step?.length || 0) / stepsInfo.length) * 100}%
                  </Typography>
                </Box>
              </Box>

              <Box ml={4}>
                <Typography color="secondary" lineHeight="28px" fontSize="16px">
                  قدم {nthNumbers[step?.length || 0] || '...'}:
                </Typography>

                <Typography lineHeight="28px" sx={{ mt: 2 }}>
                  {stepsInfo.find(({ key }) => !step.find((item) => item === key))?.description}
                </Typography>
              </Box>
            </Box>

            <Box display="flex" gap={4} mt={4}>
              <DescriptionItem
                icon={<StarOutlineOutlined color="primary" />}
                title="امتیاز:"
                description={((businessFullDetails?.score || 0) / 20).toFixed(1) || '...'}
              />

              <DescriptionItem
                icon={<CommentOutlined color="primary" />}
                title="دیدگاه ها:"
                description={businessFullDetails?.reviews_count ?? '...'}
              />
            </Box>
          </Box>

          <Box flex="1" display="flex" justifyContent="center" alignItems="center" mb={{ xs: 2 }}>
            <Box border={'1px solid ' + theme.palette.grey[400]} p={3} borderRadius={1}>
              <Typography lineHeight="32px" fontSize="16px" color="text.secondary">
                تعداد بازدید صفحه کسب‌وکارتان در ۳۰ روز گذشته:
              </Typography>

              <Typography lineHeight="44px" fontSize="22px" sx={{ mt: 2 }}>
                {views ? viewsNumber : '...'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Switch>
          <Case condition={hasProvokingMessage}>
            <Box
              sx={{ background: theme?.palette.primary.light }}
              width="100%"
              display="flex"
              alignItems="center"
              flexDirection="column"
              gap={4}
              px={2}
              pb={2}
              justifyContent="center">
              <Typography sx={{ mt: 3 }} fontSize="16px" fontWeight={500} lineHeight="32px">
                هنوز به تعداد بازدید موردنظرتان نرسیدید؟
              </Typography>

              <Typography lineHeight="32px">
                صفحه‌های مربوط {businessFullDetails?.main_tag}{' '}
                {clickPriceData?.click_price_recommendation} بار در محله های اطراف شما دیده شده است.
              </Typography>

              <Typography color="primary">
                با فعال‌سازی تبلیغات، شما هم در این صفحه‌ها دیده شوید.
              </Typography>

              <Button
                id="behtarino--admin--buyAdsBtn"
                variant="contained"
                sx={{ px: 24 }}
                onClick={() => {
                  navigate(ROUTES.ADS);
                }}>
                فعال‌سازی تبلیغات
              </Button>
            </Box>
          </Case>

          <Case condition={!hasSubscription}>
            <Box
              sx={{ background: theme?.palette.primary.light }}
              width="100%"
              display="flex"
              alignItems="center"
              flexDirection="column"
              gap={4}
              px={2}
              pb={2}
              justifyContent="center">
              <Typography sx={{ mt: 3 }} fontSize="16px" fontWeight={500} lineHeight="32px">
                امکانات و تعداد بازدید بیشتر می‌خواهید؟
              </Typography>

              <Typography lineHeight="32px">
                در صفحه‌های بیشتر نمایش داده شوید و با نماد تایید بهترینو، متفاوت دیده شوید.
              </Typography>

              <Typography color="primary">
                با خرید عضویت، شما هم از امکانات بیشتر سایت استفاده کنید.
              </Typography>

              <Button
                id="behtarino--admin--buySubBtn"
                variant="contained"
                sx={{ px: 24 }}
                onClick={() => {
                  navigate(ROUTES.SUBSCRIPTION);
                }}>
                خرید عضویت
              </Button>
            </Box>
          </Case>
        </Switch>
      </Paper>

      <Box mt={5}>
        <Card title="افزایش دیدگاه‌های کسب‌وکارتان">
          <Box display="flex" gap={3} flexDirection="column" alignItems="center">
            <Typography mt={2}>
              شما می‌توانید فایل QR Code صفحه‌ی کسب‌وکار خود را دریافت کنید و به راحتی مشتریان حضوری
              خود را به ثبت سریع دیدگاه‌شان تشویق کنید.
            </Typography>

            <Button
              id="behtarino--admin--genQR"
              onClick={() => {
                function getImgFromUrl(src: string, callback: (image: HTMLImageElement) => void) {
                  const img = new Image();
                  img.src = src;
                  img.onload = function () {
                    callback(img);
                  };
                }

                getImgFromUrl(QRTemplate, async function (image: HTMLImageElement) {
                  const pdf = new jsPDF('p', 'mm', 'a4');

                  const width = 210;
                  const height = 297;

                  pdf.addImage(image, 'PNG', 0, 0, width, height);

                  const dataSrc = await QR.toDataURL(
                    `https://behtarino.com/p/${selectedBusiness?.slug}~${selectedBusiness?.title_slug}?reviewModal=true`,
                    {
                      errorCorrectLevel: 'H',
                      size: 256
                    }
                  );

                  pdf.addImage(dataSrc, 'PNG', width / 2 - 25, height / 2 + 47.5, 50, 50);

                  pdf.save('behtarino-qrcode-for-business.pdf');
                });
              }}
              variant="outlined"
              fullWidth={true}
              sx={{ mt: 3, maxWidth: { xs: 'unset', md: '300px' } }}>
              دریافت فایل
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};
export default HomePage;
