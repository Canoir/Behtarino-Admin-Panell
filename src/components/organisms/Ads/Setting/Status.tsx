import { Button, Switch as GoogleSwitch, Typography } from '@mui/material';
import { Case, Default, Switch } from 'react-if';

import { AdsPackageSingle } from '@typings/Ads';
import AdsServices from '@services/ads';
import Card from '@components/molecules/kit/Card';
import { ChooseGatewayOverlay } from '@components/molecules/Ads/ChargeBalance/Overlay/Gateway';
import { ChoosePackageOverlay } from '@components/molecules/Ads/ChargeBalance/Overlay/PackageSuggestion';
import useAdsReport from '@hooks/api/useAdsReport';
import useDeepEffect from '@hooks/useDeepEffect';
import { useState } from 'react';
import useToggle from '@hooks/useToggle';
import { ADS } from '@constants/test';

type Props = { __test__?: { balance: number } };
const AdsSettingStatus = (props: Props) => {
  const ads = useAdsReport();
  const { data: adsReport, slug, refetch } = ads;
  const { balance } = adsReport || props.__test__ || { balance: 0 };
  const [statusToggle, toggleStatus] = useToggle(adsReport?.is_active);

  useDeepEffect(() => {
    if (statusToggle !== adsReport?.is_active) toggleStatus();
  }, [adsReport?.is_active]);

  const [chosenPackage, setChosenPackage] = useState<AdsPackageSingle>({
    id: null,
    amount: 0,
    code: '',
    giftPercentage: { free: 0, expert: 0, vip: 0 }
  });
  const [openModalSlug, setOpenModalSlug] = useState<'Package' | 'Gateway' | 'None'>('None');

  return (
    <>
      <ChoosePackageOverlay<AdsPackageSingle>
        open={openModalSlug === 'Package'}
        onClose={() => setOpenModalSlug('None')}
        next={(chosenPackage) => {
          setChosenPackage(chosenPackage);
          setOpenModalSlug('Gateway');
        }}
      />

      <ChooseGatewayOverlay
        package={chosenPackage}
        open={openModalSlug === 'Gateway'}
        onClose={() => setOpenModalSlug('None')}
      />

      <Card
        title="وضعیت تبلیغات"
        actionIcons={[
          {
            render: (
              <GoogleSwitch
                id="behtarino--admin--adsSettingSwitch"
                disabled={balance <= 0}
                checked={statusToggle ?? false}
                onChange={() => {
                  toggleStatus();
                  AdsServices.update(slug || '', { is_active: !statusToggle })
                    .then(() => {
                      refetch();
                    })
                    .catch(() => {
                      toggleStatus();
                    });
                }}
              />
            )
          }
        ]}>
        <Typography sx={{ pl: 5, mt: 3 }}>
          <Switch>
            <Case condition={balance > 0 && statusToggle}>
              وضعیت تبلیغات شما فعال است. تبلیغات کسب‌و‌کار شما با توجه‌ به تنظیمات انتخابی‌تان
              نمایش داده ‌می‌شود.
            </Case>

            <Case condition={balance < 0}>
              در حال حاضر شارژ تبلیغات شما منفی است و وضعیت آن غیرفعال شده است. برای فعال کردن
              تبلیغات‌تان، شارژ آن را افزایش دهید.
            </Case>

            <Case condition={balance === 0}>
              در حال حاضر شارژ تبلیغات شما تمام شده و وضعیت آن غیرفعال شده است. برای فعال کردن
              تبلیغات‌تان، شارژ آن را افزایش دهید.
            </Case>

            <Default>
              در حال حاضر وضعیت تبلیغات شما غیرفعال است و هزینه‌ای از شارژ شما کم نمی‌شود. برای
              نمایش تبلیغات‌تان، وضعیت آن را فعال کنید.
            </Default>
          </Switch>
        </Typography>

        {balance <= 0 ? (
          <Button
            data-testId={ADS.buyAds}
            variant="contained"
            sx={{ mt: 4 }}
            fullWidth
            onClick={() => setOpenModalSlug('Package')}>
            افزایش شارژ
          </Button>
        ) : null}
      </Card>
    </>
  );
};
export default AdsSettingStatus;
