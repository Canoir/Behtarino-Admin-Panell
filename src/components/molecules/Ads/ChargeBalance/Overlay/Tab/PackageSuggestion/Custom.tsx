import { Box, Radio, Typography } from '@mui/material';

import { AdsPackage } from '@typings/Ads';
import { SelectedAdsPackage } from '../../PackageSuggestion';
import { SingleAdsPricePackage } from '@components/molecules/Ads/Package';
import { TabPanel } from '@mui/lab';

type Props = {
  packs: AdsPackage | undefined;
  setSelectedPackage: (selectedPackage: SelectedAdsPackage) => void;
  selectedPackage: SelectedAdsPackage;
};
export function CustomPackageSuggestion(props: Props) {
  const { packs, selectedPackage, setSelectedPackage } = props;

  return (
    <TabPanel value="Custom">
      <Box p={5}>
        <Typography>لطفا مبلغ شارژ تبلیغات موردنظرتان را انتخاب کنید.</Typography>
      </Box>

      <Box p={5} pl={0}>
        {packs?.suggested_packes?.map(({ id, ...restFields }) => (
          <Box mb={6} key={id} width="100%" display="flex" alignItems="center">
            <Radio
              checked={
                String(selectedPackage.id) === String(id) && selectedPackage.type === 'Custom'
              }
              value={String(id)}
              sx={{ height: '42px' }}
              onChange={(e) =>
                setSelectedPackage({
                  id: +e.target.value,
                  type: 'Custom',
                  code: restFields.code,
                  amount: restFields.amount,
                  giftPercentage: restFields.giftPercentage
                })
              }
            />
            <SingleAdsPricePackage
              data={{ ...restFields, id }}
              onClick={(clickedId) =>
                setSelectedPackage({
                  id: clickedId,
                  type: 'Custom',
                  code: restFields.code,
                  amount: restFields.amount,
                  giftPercentage: restFields.giftPercentage
                })
              }
            />
          </Box>
        ))}
      </Box>
    </TabPanel>
  );
}
