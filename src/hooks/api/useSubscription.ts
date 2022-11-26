import { SUBSCRIPTION_QUERY_KEY } from '@constants/queryKeys';
import { Subscription } from '@typings/Subscription';
import SubscriptionService from '@services/subscription';
import useBusiness from './useBusiness';
import { useQuery } from 'react-query';

const useSubscription = () => {
  const { data: selectedBusiness } = useBusiness();

  const { data } = useQuery<Subscription | null, Error>(
    [SUBSCRIPTION_QUERY_KEY, selectedBusiness?.slug],
    async () => SubscriptionService.get(selectedBusiness?.slug || ''),
    {
      enabled: !!selectedBusiness?.slug
    }
  );
  return { data };
};
export default useSubscription;
