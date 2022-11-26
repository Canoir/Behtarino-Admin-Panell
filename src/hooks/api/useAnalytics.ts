import { ANALYTICS_VIEW_QUERY_KEY } from '@constants/queryKeys';
import AnalyticsServices from '@services/analytics';
import useBusiness from './useBusiness';
import { useQuery } from 'react-query';

const useAnalytics = (from: number, to: number) => {
  const { data: selectedBusiness } = useBusiness();

  const { data } = useQuery<Record<string, number>, Error>(
    [ANALYTICS_VIEW_QUERY_KEY, selectedBusiness?.slug, from, to, 'analytics'],
    async () => AnalyticsServices.getBusinessPageView(selectedBusiness?.slug || '', { from, to }),
    {
      enabled: !!selectedBusiness?.slug
    }
  );

  const { data: clickPriceData } = useQuery<{ click_price_recommendation: number }, Error>(
    [ANALYTICS_VIEW_QUERY_KEY, selectedBusiness?.slug],
    async () => AnalyticsServices.getClickPriceRecommendation(selectedBusiness?.slug || ''),
    {
      enabled: !!selectedBusiness?.slug
    }
  );

  return { data, clickPriceData };
};
export default useAnalytics;
