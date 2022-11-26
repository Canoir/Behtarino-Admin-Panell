import { Box } from '@mui/material';
import Card from '@components/molecules/kit/Card';
import PaymentStepper from '../../../molecules/Subscription/PaymentStepper';
import { Responsive } from '@components/molecules/kit/Responsive';
import { lazy } from 'react';
import moment from 'moment-jalaali';
import useContract from '@hooks/api/useContract';
import useSubscription from '@hooks/api/useSubscription';

const PaymentInfo = lazy(
  () => import(/* webpackPrefetch: true */ '@components/molecules/Subscription/PaymentInfo')
);

const PaymentInfoContainer = lazy(
  () =>
    import(/* webpackPrefetch: true */ '@components/molecules/Subscription/PaymentInfo/Container')
);

const PaymentInfoMobile = lazy(
  () => import(/* webpackPrefetch: true */ '@components/molecules/Subscription/PaymentInfo/mobile')
);

export function CurrentSubscriptionPayment() {
  const { data: currentSubscription } = useSubscription();

  const currentContractId = String(currentSubscription?.subscription_details?.contract);

  const { data: currentContract } = useContract(currentContractId);

  const { first_due_transaction, behtarino_transactions: transactions } = currentContract || {};
  const { _transaction_id: currentTransactionId } = first_due_transaction || {};

  //
  return (
    <Card title="پرداخت قسط‌ها" sx={{ mt: 5, display: currentContractId ? 'block' : 'none' }}>
      <PaymentStepper />

      <Responsive.Desktop>
        {() => (
          <PaymentInfoContainer>
            <>
              {transactions
                ?.sort((a, b) => moment(a.due_date).unix() - moment(b.due_date).unix())
                .map((trans, index) => (
                  <PaymentInfo
                    key={index}
                    transaction={trans}
                    index={index}
                    isCurrent={currentTransactionId === trans._transaction_id}
                    contractId={+currentContractId}
                  />
                ))}
            </>
          </PaymentInfoContainer>
        )}
      </Responsive.Desktop>

      <Responsive containedKey="md">
        {() => (
          <Box mt={4}>
            {transactions
              ?.sort((a, b) => moment(a.due_date).unix() - moment(b.due_date).unix())
              .map((trans, index) => (
                <PaymentInfoMobile
                  key={index}
                  transaction={trans}
                  index={index}
                  isCurrent={currentTransactionId === trans._transaction_id}
                  contractId={+currentContractId}
                />
              ))}
          </Box>
        )}
      </Responsive>
    </Card>
  );
}
