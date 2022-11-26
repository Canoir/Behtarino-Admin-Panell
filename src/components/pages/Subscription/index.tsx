import { CurrentSubscriptionPage } from './Current';
import { Grid } from '@mui/material';
import { NewSubscriptionPage } from './New';
import useSubscription from '@hooks/api/useSubscription';

const Subscription = () => {
  const { data: currentSubscription } = useSubscription();

  const hasSubscription = currentSubscription?.subscription_details?.end;

  return (
    <Grid container>
      <Grid item xs={12}>
        {hasSubscription ? <CurrentSubscriptionPage /> : <NewSubscriptionPage />}
      </Grid>
    </Grid>
  );
};
export default Subscription;
