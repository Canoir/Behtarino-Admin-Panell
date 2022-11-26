import { Box, Table, TableBody, Typography, useTheme } from '@mui/material';
import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';
import { useMemo, useState } from 'react';

import { AdsPackageSingle } from '@typings/Ads';
import { GatewayItem } from '@components/atoms/GatewayItem';
import { PriceListItem } from '@components/molecules/Checkout/PriceListItem';
import { SubscriptionType } from '@typings/Subscription';
import TransactionServices from '@services/transaction';
import useAdsReport from '@hooks/api/useAdsReport';
import useToggle from '@hooks/useToggle';

export const ChooseGatewayOverlay = ({
  open,
  onClose,
  package: chosenPackage
}: Omit<OverlayProps, 'title' | 'children'> & { package: AdsPackageSingle }) => {
  const [selectedGateway, setSelectedGatway] = useState<number>(0);
  const [isLoading, toggleIsLoading] = useToggle(false);

  const { data: selectedBusiness, slug } = useAdsReport();
  const { subscription_type } = selectedBusiness || {};

  const theme = useTheme();

  const tableData = useMemo(
    () => TableData(chosenPackage, subscription_type || 'free'),
    [chosenPackage, subscription_type]
  );

  const handleSubmit = () => {
    toggleIsLoading();

    TransactionServices.createPackage(chosenPackage.code, slug || '')
      .then(({ transaction_id }) => {
        return TransactionServices.getGateway(transaction_id || 0);
      })
      .then(({ url }) => {
        window.location.href = url;
      })
      .finally(toggleIsLoading);
  };

  return (
    <Overlay
      title="شارژ حساب تبلیغات"
      open={open}
      onClose={onClose}
      ctas={[
        {
          title: 'پرداخت',
          onClick: handleSubmit,
          loading: isLoading,
          disabled: selectedGateway === -1
        }
      ]}>
      <>
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
      </>
    </Overlay>
  );
};

const TableData = (
  { amount, giftPercentage }: AdsPackageSingle,
  subscription_type: SubscriptionType
) => [
  {
    title: 'مبلغ شارژ',
    price: amount,
    isImportant: false
  },
  {
    title: 'مالیات (۹٪)',
    price: amount * 0.09,
    isImportant: false
  },
  {
    title: 'شارژ هدیه',
    price: (amount * giftPercentage[subscription_type]) / 100,
    isImportant: false
  },
  {
    title: 'شارژ اعمال شده در حساب شما',
    price: amount + (amount * giftPercentage[subscription_type]) / 100,
    isImportant: false
  },
  {
    title: 'مبلغ قابل پرداخت',
    price: amount * 1.09,
    isImportant: true
  }
];
