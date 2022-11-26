import { Route, Routes, useSearchParams } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';

import { Loader } from '@components/atoms/Loader';
import { ROUTES } from '@constants/routes';
import useBusiness from '@hooks/api/useBusiness';

const Ads = lazy(() => import(/* webpackPrefetch: true */ '@components/pages/Ads'));
const AdsSetting = lazy(() => import(/* webpackPrefetch: true */ '@components/pages/Ads/Setting'));
const Analytics = lazy(() => import(/* webpackPrefetch: true */ '@components/pages/Analytics'));
const Checkout = lazy(() => import(/* webpackPrefetch: true */ '@pages/Checkout'));
const Home = lazy(() => import(/* webpackPrefetch: true */ '@components/pages/Home'));
const MailBox = lazy(() => import(/* webpackPrefetch: true */ '@components/pages/MailBox'));
//prettier-ignore
const Renewal = lazy(() => import(/* webpackPrefetch: true */ '@components/pages/Subscription/Renewal'));
const Review = lazy(() => import(/* webpackPrefetch: true */ '@components/pages/Reviews'));
const Setting = lazy(() => import(/* webpackPrefetch: true */ '@pages/Setting'));
const Subscription = lazy(() => import(/* webpackPrefetch: true */ '@pages/Subscription'));

export function Router() {
  const selectedSlug = useSearchParams()[0].get('slug');
  const { setSelectedAccount } = useBusiness();

  useEffect(() => {
    if (selectedSlug) setSelectedAccount(selectedSlug);
  }, [selectedSlug]);
  //
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={ROUTES.ADS_SETTINGS} element={<AdsSetting />} />
        <Route path={ROUTES.ADS} element={<Ads />} />
        <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.MAILBOX} element={<MailBox />} />
        <Route path={ROUTES.RENEWAL} element={<Renewal />} />
        <Route path={ROUTES.REVIEW} element={<Review />} />
        <Route path={ROUTES.SETTINGS} element={<Setting />} />
        <Route path={ROUTES.SUBSCRIPTION} element={<Subscription />} />
      </Routes>
    </Suspense>
  );
}
