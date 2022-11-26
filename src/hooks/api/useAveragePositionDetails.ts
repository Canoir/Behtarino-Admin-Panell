import { ANALYTICS_VIEW_QUERY_KEY } from '@constants/queryKeys';
import AnalyticsServices from '@services/analytics';
import { AveragePositionDetails } from '@typings/Analystic';
import _orderBy from 'lodash/orderBy';
import moment from 'moment-jalaali';
import useBusiness from './useBusiness';
import { useQuery } from 'react-query';

const useAveragePositionDetails = (fromDate: moment.Moment, toDate: moment.Moment) => {
  const { data: selectedBusiness } = useBusiness();

  const from = fromDate.unix();
  const to = toDate.unix();

  const { data, isLoading } = useQuery<AveragePositionDetails, Error>(
    [ANALYTICS_VIEW_QUERY_KEY, selectedBusiness?.slug, from, to],
    async () =>
      AnalyticsServices.getAveragePositionsDetails(selectedBusiness?.slug || '', { from, to }),
    {
      enabled: !!selectedBusiness?.slug
    }
  );

  return {
    data: data && !isLoading ? _orderBy(data, ['click_count'], ['desc']) : undefined,
    isLoading
  };
};
export default useAveragePositionDetails;
