import {
  SubscriptionRenewalData,
  SubscriptionType,
  SubscriptionTypeStaticDetails
} from '@typings/Subscription';
import { useCallback, useMemo } from 'react';

import { ROUTES } from '@constants/routes';
import moment from 'moment-jalaali';
import useContract from './api/useContract';
import { useNavigate } from 'react-router-dom';
import useSubscription from './api/useSubscription';

export default function useSubscriptionOffer() {
  const { data: currentSubscription } = useSubscription();
  const { data: contractData } = useContract(
    String(currentSubscription?.subscription_details?.contract)
  );
  const navigate = useNavigate();

  const currentPlan = currentSubscription?.subscription_details?.plan || 'free';
  const currentPlanEndDate = moment(currentSubscription?.subscription_details?.end || '');

  const suggestData = useMemo(() => {
    if (contractData?.duration && currentPlanEndDate && currentSubscription?.subscription_details)
      return getRenewalData(currentPlanEndDate, currentPlan, contractData?.duration);

    return { price: 0, duration: 0 };
  }, [contractData?.duration, currentPlanEndDate, currentSubscription]);

  const handleRenewalClick = useCallback(() => {
    navigate(ROUTES.RENEWAL);
  }, []);

  return {
    handleRenewalClick,
    contractDuration: contractData?.duration,
    suggestData,
    hasSubscription: !!currentSubscription?.subscription_details,
    currentPlan,
    currentPlanEndDate,
    currentPlanTitle: SubscriptionTypeStaticDetails[currentPlan]?.title
  };
}

const getRenewalData = (
  currentDate: moment.Moment,
  subType: SubscriptionType,
  duration: number
) => {
  const diffDate = moment().diff(currentDate, 'days');

  for (const key in SubscriptionRenewalData)
    if (Math.abs(diffDate) <= +key)
      return { ...SubscriptionRenewalData[key][subType][duration], duration: diffDate } || {};
};
