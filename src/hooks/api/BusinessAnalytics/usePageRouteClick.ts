import { ANALYTICS_VIEW_QUERY_KEY } from '@constants/queryKeys';
import AnalyticsServices from '@services/analytics';
import _sum from 'lodash/sum';
import useBusiness from '../useBusiness';
import { useQuery } from 'react-query';

type Output = {
  data: Record<string, number> | undefined;
  overall: () => string | number;
  isLoading?: boolean;
};
const useBIPageRouteClick = (from: number, to: number): Output => {
  const { data: selectedBusiness } = useBusiness();

  const { data, isLoading } = useQuery<Record<string, number>, Error>(
    [ANALYTICS_VIEW_QUERY_KEY, selectedBusiness?.slug, from, to, 'prc'],
    async () => AnalyticsServices.getPageRouteClick(selectedBusiness?.slug || '', { from, to }),
    {
      enabled: !!selectedBusiness?.slug
    }
  );

  return {
    data,
    overall: () => _sum(Object.values(data || [])),
    isLoading
  };
};
export default useBIPageRouteClick;
