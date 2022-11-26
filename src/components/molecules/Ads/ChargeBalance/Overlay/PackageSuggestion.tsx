import Overlay, { OverlayProps } from '@components/molecules/kit/Overlay';
import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import DefaultPackageSuggestion from './Tab/PackageSuggestion/Default';
import { defaultPackPrices } from '@constants/ads';
import useAdsSuggestedPackages from '@hooks/api/useAdsPackages';

export type SelectedAdsPackage = {
  type: 'Custom' | 'Behtarino';
  code: string;
  id: number | null;
  amount: number;
  giftPercentage: { free: number; expert: number; vip: number };
};

export function ChoosePackageOverlay<Result>({
  open,
  next,
  onClose
}: Omit<OverlayProps, 'title' | 'children'> & { next: (result: Result) => void }) {
  const [activeTab, setActiveTab] = useState<'Custom' | 'Behtarino'>('Behtarino');
  const [selectedPackage, setSelectedPackage] = useState<SelectedAdsPackage>({
    type: activeTab,
    id: null,
    amount: 0,
    code: '',
    giftPercentage: { free: 0, expert: 0, vip: 0 }
  });

  const { data: suggestedPackges } = useAdsSuggestedPackages();
  const { suggested_packes } = suggestedPackges || {};

  useEffect(() => {
    if (suggestedPackges) {
      if (suggested_packes && suggested_packes.length > 0) {
        setActiveTab('Behtarino');
      }
    }
  }, [suggestedPackges]);

  const handleSubmit = () => {
    next(selectedPackage as unknown as Result);
  };

  return (
    <Overlay
      title="شارژ حساب تبلیغات"
      open={open}
      onClose={onClose}
      ctas={[
        {
          title: 'افزایش شارژ',
          onClick: handleSubmit,
          loading: !suggestedPackges,
          disabled: !selectedPackage.id
        }
      ]}>
      <Box pb={5}>
        {/* This code has been commented due to diffrent planning than design! */}
        {/* <TabContext value={activeTab}>
          <Box width="100%" borderBottom={1} borderColor="divider">
            <Tabs
              variant="fullWidth"
              value={activeTab}
              onChange={(_, newValue) => {
                setActiveTab(newValue);
              }}>
              <Tab
                label="پیشنهاد برای شما"
                value="Custom"
                disabled={!(suggested_packes && suggested_packes.length > 0)}
              />
              <Tab label="پیش فرض بهترینو" value="Behtarino" />
            </Tabs>
          </Box> */}

        {/* <CustomPackageSuggestion
            packs={suggestedPackges}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
          /> */}

        <DefaultPackageSuggestion
          packs={defaultPackPrices.suggested_packes}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
        />
        {/* </TabContext> */}
      </Box>
    </Overlay>
  );
}
