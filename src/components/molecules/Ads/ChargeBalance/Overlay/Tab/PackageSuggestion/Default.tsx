import { Box, Radio, Typography } from '@mui/material';

import { AdsPackageSingle } from '@typings/Ads';
import { SelectedAdsPackage } from '../../PackageSuggestion';
import { SingleAdsPricePackage } from '@components/molecules/Ads/Package';

type Props = {
  packs: AdsPackageSingle[] | undefined;
  setSelectedPackage: (selectedPackage: SelectedAdsPackage) => void;
  selectedPackage: SelectedAdsPackage;
};
function DefaultPackageSuggestion(props: Props) {
  const { packs, selectedPackage, setSelectedPackage } = props;

  return (
    // <TabPanel value="Behtarino">
    <>
      <Box p={5}>
        <Typography>لطفا مبلغ شارژ تبلیغات موردنظرتان را انتخاب کنید.</Typography>
      </Box>

      <Box p={5} pl={0}>
        {packs?.map(({ id, ...restFields }) => (
          <Box mb={6} key={id} width="100%" display="flex" alignItems="center">
            <Radio
              checked={
                String(selectedPackage.id) === String(id) && selectedPackage.type === 'Behtarino'
              }
              value={String(id)}
              sx={{ height: '42px' }}
              onChange={(e) =>
                setSelectedPackage({
                  id: +e.target.value,
                  type: 'Behtarino',
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
                  type: 'Behtarino',
                  code: restFields.code,
                  amount: restFields.amount,
                  giftPercentage: restFields.giftPercentage
                })
              }
            />
          </Box>
        ))}
      </Box>
    </>
    // </TabPanel>
  );
}

export default DefaultPackageSuggestion;