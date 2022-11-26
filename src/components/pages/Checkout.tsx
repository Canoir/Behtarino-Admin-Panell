import { AdsCheckout } from '@components/organisms/Checkout/Ads';
import { BuySubscriptionCheckout } from '@components/organisms/Checkout/Subscription';
import { Grid } from '@mui/material';
import { PaySubscriptionStep } from '@components/organisms/Checkout/Subscription/WithStep';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const CheckoutPage = () => {
  const [params] = useSearchParams();

  const [type, contractId, paymentType] = useMemo(
    () => [
      +(params.get('type') || 0),
      params.get('contract') || '',
      (params.get('payment') || 'cash') as 'installment' | 'cash'
    ],
    [params]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {paymentType === 'cash' && type === 1 ? (
          <AdsCheckout contractId={contractId} />
        ) : paymentType === 'cash' && type === 0 ? (
          <BuySubscriptionCheckout contractId={contractId} />
        ) : (
          <PaySubscriptionStep contractId={contractId} />
        )}
      </Grid>
    </Grid>
  );
};
export default CheckoutPage;
