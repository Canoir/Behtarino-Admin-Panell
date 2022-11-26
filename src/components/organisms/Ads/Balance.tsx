import { Box, Button, Typography } from '@mui/material';

import { AdsPackageSingle } from '@typings/Ads';
import Card from '@components/molecules/kit/Card';
import { ChooseGatewayOverlay } from '@components/molecules/Ads/ChargeBalance/Overlay/Gateway';
import { ChoosePackageOverlay } from '@components/molecules/Ads/ChargeBalance/Overlay/PackageSuggestion';
import { ROUTES } from '@constants/routes';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { numberToPriceFormat } from '@utils/Numbers';
import useAdsReport from '@hooks/api/useAdsReport';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AdsBalance = () => {
  const { data: adsReport } = useAdsReport();
  const isBalanceBelowZero = (adsReport?.balance || 0) < 0;

  const navigate = useNavigate();

  const [chosenPackage, setChosenPackage] = useState<AdsPackageSingle>({
    id: null,
    amount: 0,
    code: '',
    giftPercentage: { free: 0, expert: 0, vip: 0 }
  });
  const [openModalSlug, setOpenModalSlug] = useState<'Package' | 'Gateway' | 'None'>('None');

  return (
    <>
      <ChoosePackageOverlay<AdsPackageSingle>
        open={openModalSlug === 'Package'}
        onClose={() => setOpenModalSlug('None')}
        next={(chosenPackage) => {
          setChosenPackage(chosenPackage);
          setOpenModalSlug('Gateway');
        }}
      />

      <ChooseGatewayOverlay
        package={chosenPackage}
        open={openModalSlug === 'Gateway'}
        onClose={() => setOpenModalSlug('None')}
      />

      <Card
        actionId="behtarino--admin--adsSettingBtn"
        actionIcons={[
          {
            icon: <SettingsOutlinedIcon />,
            onClick: () => {
              navigate(ROUTES.ADS_SETTINGS);
            }
          }
        ]}
        title="شارژ تبلیغات">
        <Typography alignSelf="start" sx={{ mt: 2 }}>
          مبلغ باقی‌مانده از شارژ تبلیغات کلیکی شما
        </Typography>

        <Box justifyContent="center" alignItems="center" display="flex" flexDirection="column">
          <Typography
            sx={{ my: 3 }}
            fontSize={24}
            color={isBalanceBelowZero ? 'error.main' : 'success.main'}>
            {numberToPriceFormat(adsReport?.balance || 0)}
          </Typography>

          <Button
            id="behtarino--admin--adsBuyBtn"
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => setOpenModalSlug('Package')}>
            افزایش شارژ حساب
          </Button>
        </Box>
      </Card>
    </>
  );
};
export default AdsBalance;
