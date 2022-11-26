import { Box } from '@mui/material';
import { CurrentSubscriptionChart } from '@components/organisms/Subscription/Current/Chart';
import { CurrentSubscriptionInfo } from '@components/organisms/Subscription/Current/Info';
import { CurrentSubscriptionPayment } from '@components/organisms/Subscription/Current/Payment';
import useContract from '@hooks/api/useContract';
import useSubscription from '@hooks/api/useSubscription';

export function CurrentSubscriptionPage() {
  const { data: currentSubscription } = useSubscription();

  const currentContractId = String(currentSubscription?.subscription_details?.contract);

  const { data: currentContract } = useContract(currentContractId);

  const { first_due_transaction } = currentContract || {};

  function PaymentRenderer() {
    return first_due_transaction ? <CurrentSubscriptionPayment /> : null;
  }

  return (
    <Box>
      <CurrentSubscriptionInfo />

      <PaymentRenderer />

      <CurrentSubscriptionChart />
    </Box>
  );
}
