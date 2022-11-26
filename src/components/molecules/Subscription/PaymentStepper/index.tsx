import { Box, Step, StepLabel, Stepper } from '@mui/material';

import useContract from '@hooks/api/useContract';
import { useMemo } from 'react';
import useSubscription from '@hooks/api/useSubscription';

function PaymentStepper() {
  const { data: currentSubscription } = useSubscription();

  const currentContractId = String(currentSubscription?.subscription_details?.contract);

  const { data: currentContract } = useContract(currentContractId);

  const { behtarino_transactions: transactions } = currentContract || {};

  const activeStep = useMemo(
    () => transactions?.filter((trans) => !!trans.status).length,
    [transactions?.length]
  );
  1;
  return (
    <Box mt={3}>
      <Stepper activeStep={activeStep}>
        <Step key={'قسط اول'}>
          <StepLabel>{'قسط اول'}</StepLabel>
        </Step>

        <Step key={'قسط دوم'}>
          <StepLabel>{'قسط دوم'}</StepLabel>
        </Step>

        {transactions?.length === 3 ? (
          <Step key={'قسط سوم'}>
            <StepLabel>{'قسط سوم'}</StepLabel>
          </Step>
        ) : null}
      </Stepper>
    </Box>
  );
}

export default PaymentStepper;
