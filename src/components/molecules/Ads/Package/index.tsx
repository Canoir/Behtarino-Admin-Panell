import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

import { AdsPackageSingle } from '@typings/Ads';
import { ReactComponent as GiftIcon } from '@assets/svg/ic_gift_12.svg';
import { numberToPriceFormat } from '@utils/Numbers';
import useAdsReport from '@hooks/api/useAdsReport';

type Props = {
  data: AdsPackageSingle;
  onClick: (id: number) => void;
};
export function SingleAdsPricePackage(props: Props) {
  const { data: priceData, onClick } = props;
  const { id, amount, giftPercentage } = priceData;

  const { data: selectedBusiness } = useAdsReport();
  const { subscription_type } = selectedBusiness || {};

  const theme = useTheme();

  return (
    <Box borderRadius={1} border={'1px solid ' + theme?.palette.grey[200]} width="100%">
      <Button fullWidth sx={{ p: 2 }} onClick={() => onClick(id ?? -1)}>
        <Grid container>
          <Grid
            item
            xs={4}
            alignItems="center"
            justifyContent="start"
            display="flex"
            borderRight={'2px dashed ' + theme?.palette.grey[400]}>
            <Typography fontSize="12px" fontWeight={600} color="text.primary">
              {numberToPriceFormat(amount)}
            </Typography>
          </Grid>

          <Grid item xs ml={3} alignItems="center" justifyContent="start">
            <Box height="50%" py={2}>
              <Typography fontSize="10px" textAlign="start" color="text.primary">
                <GiftIcon />
                {` ${numberToPriceFormat(
                  (amount * giftPercentage[subscription_type || 'free']) / 100
                )}`}
                {'شارژ هدیه'}
              </Typography>
            </Box>
            <Box height="50%" py={2}>
              <Typography fontSize="12px" color="success.main" textAlign="start">
                {'شارژ اعمال شده: '}
                {numberToPriceFormat(
                  amount + (amount * giftPercentage[subscription_type || 'free']) / 100
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Button>
    </Box>
  );
}
