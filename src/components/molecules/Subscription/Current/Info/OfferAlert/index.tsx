import CurrentSubscriptionInfoLateOffer from './LateOffer';
import CurrentSubscriptionInfoSoonOffer from './SoonOffer';
import useSubscriptionOffer from '@hooks/useSubscriptionOffer';

export default function OfferAlert() {
  const { hasSubscription } = useSubscriptionOffer();
  const isOfferOutdated = !hasSubscription;

  if (isOfferOutdated) return <CurrentSubscriptionInfoLateOffer />;
  else return <CurrentSubscriptionInfoSoonOffer />;
}
