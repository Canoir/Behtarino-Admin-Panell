import { Box, Table, TableBody, Typography, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';

import { GatewayItem } from '@components/atoms/GatewayItem';
import { LoadingButton } from '@mui/lab';
import { PriceListItem } from '@components/molecules/Checkout/PriceListItem';
import TransactionServices from '@services/transaction';
import style from './withStep.style';
import useContract from '@hooks/api/useContract';
import useToggle from '@hooks/useToggle';

export function PaySubscriptionStep(props: { contractId: string }) {
  const theme = useTheme();
  const [isLoading, toggleIsLoading] = useToggle(false);

  const [selectedGateway, setSelectedGateway] = useState<number>(0);
  const { contractId } = props || {};
  const { data: containedContract } = useContract(contractId);

  const { behtarino_transactions: transactions, contract_title: contractTitle } =
    containedContract || {};
  const { _transaction_id: transactionId, amount } = containedContract?.first_due_transaction || {};

  const tableData = useMemo(() => TableData({ amount: amount || 0 }), [amount]);

  const handleSubmit = () => {
    toggleIsLoading();
    TransactionServices.getGateway(+(transactionId || 0))
      .then(({ url }) => {
        window.location.href = url;
      })
      .finally(toggleIsLoading);
  };

  return (
    <> 
      <Box sx={style.stepContainer}>
        <Typography color="secondary" fontSize="24px">
          پرداخت قسط {(transactions?.filter((trans) => trans.status === 0).length || 0) + 1}
        </Typography>

        <Typography>{contractTitle}</Typography>
      </Box>

      <Box m={5} border={'1px solid ' + theme?.palette.grey[400]} borderRadius={1} mb={9}>
        <Table>
          <TableBody>
            {tableData.map((cellProps, index) => (
              <PriceListItem
                {...cellProps}
                isLatest={tableData.length - 1 === index}
                key={cellProps.title}
                price={cellProps.price}
              />
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box m={5} mb={1}>
        <Typography>لطفا درگاه پرداخت موردنظرتان را انتخاب کنید.</Typography>
      </Box>

      <Box display="flex" m={5} mt={0}>
        <GatewayItem
          ownKey="0"
          iconName="zibal.png"
          selectedKey={String(selectedGateway)}
          onClick={(key) => setSelectedGateway(+key)}
        />
      </Box>
      <Box m={5} mb={1}>
        <LoadingButton variant="contained" fullWidth onClick={handleSubmit} loading={isLoading}>
          پرداخت
        </LoadingButton>
      </Box>
    </>
  );
}

const TableData = ({ amount }: { amount: number }) => [
  {
    title: 'مبلغ قابل پرداخت',
    price: amount,
    isImportant: true
  }
];
