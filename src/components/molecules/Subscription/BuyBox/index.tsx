import { Box, Button, Grid, List, Paper, Typography } from '@mui/material';
import { Else, If, Then, When } from 'react-if';

import ContractServices from '@services/contract';
import { DoneOutlined } from '@mui/icons-material';
import { ReactComponent as GiftIcon } from '@assets/svg/ic_gift_12.svg';
import { Loader } from '@components/atoms/Loader';
import { NewSubscriptionFeatureTexts } from '@constants/subscription';
import { ROUTES } from '@constants/routes';
import { numberToPriceFormat } from '@utils/Numbers';
import useBusiness from '@hooks/api/useBusiness';
import { useNavigate } from 'react-router-dom';
import useSubscription from '@hooks/api/useSubscription';
import useSubscriptionOffer from '@hooks/useSubscriptionOffer';

export function SubscriptionBuyNewItem(props: { selectedDuration?: number }) {
  const { selectedDuration = 1 } = props;
  const { data: currentSubscriptionConfig } = useSubscription();
  const { suggestData } = useSubscriptionOffer();

  const navigate = useNavigate();
  const { data: selectedBusiness } = useBusiness();

  const onBuyClick = (index: number) => {
    ContractServices.getContractId(selectedBusiness?.slug || '', {
      duration: selectedDuration === 0 ? '3' : selectedDuration === 1 ? '6' : '12',
      plan: index === 1 ? 'expert' : 'vip'
    }).then((data) => {
      navigate(`${ROUTES.CHECKOUT}?type=0&contract=${data?.contract}`);
    });
  };

  return (
    <If condition={!!currentSubscriptionConfig}>
      <Then>
        <Grid container sx={{ px: { xs: 0, sm: 5 }, flexWrap: { md: 'nowrap' } }} gap={4}>
          {currentSubscriptionConfig
            ? NewSubscriptionFeatureTexts(currentSubscriptionConfig)[selectedDuration].map(
                (item, i) => (
                  <Grid item xs={12} md={4} key={i}>
                    <BuyNewSubBox
                      data={{
                        ...item,
                        giftPrice: (item.giftPrice || 0) + (suggestData?.price || 0)
                      }}
                      index={i}
                      onClick={onBuyClick}
                    />
                  </Grid>
                )
              )
            : null}
        </Grid>
      </Then>

      <Else>
        <Loader />
      </Else>
    </If>
  );
}

function BuyNewSubBox(props: {
  onClick: (index: number) => void;
  index: number;
  data: {
    title: string;
    description: string;
    discountedPrice?: number;
    giftPrice?: number;
    totalPrice?: number;
    disabledText?: string;
    features: string[];
  };
}) {
  const {
    description,
    features,
    title,
    disabledText,
    giftPrice,
    discountedPrice,
    totalPrice: price
  } = props.data;

  return (
    <Paper sx={{ minHeight: { md: '450px' } }}>
      <Box mx={5} my={3}>
        <Typography color="secondary" fontSize={24} lineHeight="48px">
          {title}
        </Typography>

        <Typography sx={{ height: '86px', mt: 5 }} color="text.secondary">
          {description}
        </Typography>

        <Box
          display="flex"
          mt={3}
          alignItems="center"
          visibility={!giftPrice ? 'hidden' : 'visible'}>
          <GiftIcon />
          <Typography lineHeight="26px" fontSize="12px" ml={1}>
            {numberToPriceFormat(giftPrice || 0)}
            شارژ تبلیغات هدیه
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
          <If condition={!disabledText}>
            <Then>
              <When condition={discountedPrice !== price}>
                <Typography
                  lineHeight="32px"
                  sx={{ textDecorationLine: 'line-through' }}
                  color="text.secondary">
                  {numberToPriceFormat(price || 0)}
                </Typography>
              </When>

              <Typography lineHeight="32px">{numberToPriceFormat(discountedPrice || 0)}</Typography>
            </Then>
            <Else>
              <Typography lineHeight="32px">رایگان</Typography>
            </Else>
          </If>
        </Box>

        <Button
          sx={{ mt: 3 }}
          variant="contained"
          fullWidth
          disabled={!!disabledText}
          onClick={() => props.onClick(props.index)}>
          خرید اشتراک
        </Button>

        <List>
          {features.map((item, i) => (
            <Box key={i} display="flex" mt={3}>
              <DoneOutlined color="success" style={{ fontSize: '16px' }} />
              <Typography fontSize={12}>{item}</Typography>
            </Box>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
