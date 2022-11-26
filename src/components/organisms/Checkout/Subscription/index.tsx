import { Box, Table, TableBody, Typography, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';

import { GatewayItem } from '@components/atoms/GatewayItem';
import { LoadingButton } from '@mui/lab';
import { PriceListItem } from '@components/molecules/Checkout/PriceListItem';
import TransactionServices from '@services/transaction';
import useContract from '@hooks/api/useContract';
import useToggle from '@hooks/useToggle';

export function BuySubscriptionCheckout(props: { contractId: string }) {
  const theme = useTheme();
  const [isLoading, toggleIsLoading] = useToggle(false);

  const [selectedGateway, setSelectedGatway] = useState<number>(0);
  const { contractId } = props || {};
  const { data: containedContract } = useContract(contractId);

  const { discount, plan, contract_title: contractTitle } = containedContract || {};
  const { _transaction_id: transactionId, amount } = containedContract?.first_due_transaction || {};

  const tableData = useMemo(
    () => TableData({ amount: amount || 0, discount: discount || 0 }),
    [amount, discount]
  );

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
      <Box
        m={5}
        p={4}
        border={'1px solid ' + theme?.palette.grey[400]}
        borderRadius={1}
        display="flex"
        justifyContent="space-between"
        alignItems="center">
        <Typography color="secondary" fontSize="24px">
          عضویت {plan}
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
          onClick={(key) => setSelectedGatway(+key)}
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

const TableData = ({ amount, discount }: { amount: number; discount: number }) => [
  {
    title: 'مبلغ کل',
    price: amount / 1.09 / (1 - discount),
    isImportant: false
  },
  {
    title: 'تخفیف',
    price: (amount / 1.09) * (discount / (1 - discount)),
    isImportant: false
  },
  {
    title: 'مالیات (۹٪)',
    price: amount * (9 / 109),
    isImportant: false
  },
  {
    title: 'مبلغ قابل پرداخت',
    price: amount,
    isImportant: true
  }
];
