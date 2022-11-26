import { Button, Grid, Typography } from '@mui/material';

import { Transaction } from '@typings/Contract';
import { Unless } from 'react-if';
import moment from 'moment-jalaali';
import { numberToPriceFormat } from '@utils/Numbers';
import { useNavigate } from 'react-router-dom';

function PaymentInfoItem(props: {
  index: number;
  transaction: Transaction;
  isCurrent: boolean;
  contractId: number;
}) {
  const { index, transaction, isCurrent, contractId } = props;
  const { status, due_date, amount } = transaction;
  const navigate = useNavigate();

  const isPaid = status === 0;
  return (
    <Grid
      alignItems="center"
      border={(theme) => '1px solid ' + theme.palette.primary.main}
      borderRadius={1}
      container
      mt={2}
      p={2}>
      <Grid item xs={3}>
        <Typography color="secondary" fontSize="14px">
          قسط شماره {index + 1}
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography color={isCurrent ? 'primary' : 'text.disabled'} fontSize="14px">
          {numberToPriceFormat(amount)}
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography color={isCurrent ? 'primary' : 'text.disabled'} fontSize="14px">
          {moment(due_date).format('jYYYY/jMM/jDD')}
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Typography
          color={isPaid ? 'text.success' : isCurrent ? 'primary' : 'text.disabled'}
          fontSize="14px">
          {isPaid ? 'پرداخت شده' : 'در انتظار پرداخت'}
        </Typography>
      </Grid>

      <Grid item xs={1}>
        <Unless condition={isPaid}>
          <Button
            variant="contained"
            disabled={!isCurrent}
            onClick={() => navigate(`/checkout?type=0&contract=${contractId}&payment=installment`)}>
            پرداخت
          </Button>
        </Unless>
      </Grid>
    </Grid>
  );
}

export default PaymentInfoItem;
