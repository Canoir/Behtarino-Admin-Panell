import { Box, Button, Typography } from '@mui/material';

import { Transaction } from '@typings/Contract';
import { When } from 'react-if';
import moment from 'moment-jalaali';
import { numberToPriceFormat } from '@utils/Numbers';
import { useNavigate } from 'react-router-dom';

const SpaceBetweenTexts = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mt: 2
};
const TextFonts = { lineHeight: '26px', fontSize: '12px', color: 'primary' };

function PaymentStatusMobile(props: {
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
    <Box
      border={(theme) => '1px solid ' + theme.palette.primary.main}
      borderRadius={1}
      mt={2}
      p={2}>
      <Typography color="secondary" lineHeight="26px">
        قسط شماره {index + 1}
      </Typography>

      <Box {...SpaceBetweenTexts} mt={4}>
        <Typography {...TextFonts} fontWeight={500}>
          مبلغ قسط
        </Typography>

        <Typography {...TextFonts}>{numberToPriceFormat(amount)}</Typography>
      </Box>

      <Box {...SpaceBetweenTexts}>
        <Typography {...TextFonts} fontWeight={500}>
          تاریخ سررسید
        </Typography>

        <Typography {...TextFonts}>{moment(due_date).format('jYYYY/jMM/jDD')}</Typography>
      </Box>

      <Box {...SpaceBetweenTexts}>
        <Typography {...TextFonts} fontWeight={500}>
          وضعیت پرداخت
        </Typography>

        <Typography {...TextFonts} color={isPaid ? 'text.success' : 'primary'}>
          {isPaid ? 'پرداخت شده' : 'در انتظار پرداخت'}
        </Typography>
      </Box>

      <When condition={isCurrent}>
        <Button
          fullWidth
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() => navigate(`/checkout?type=0&contract=${contractId}&payment=installment`)}>
          پرداخت
        </Button>
      </When>
    </Box>
  );
}

export default PaymentStatusMobile;
