import { AnalyticsAvailableKeys, AnalyticsChartsKeys } from '@constants/analytics';

import moment from 'moment-jalaali';
import { sum } from 'lodash';
import useBIAveragePositions from './useAveragePositions';
import useBICallRequests from './useCallRequests';
import useBIImageviewClicks from './useImageviewClicks';
import useBIPageRouteClick from './usePageRouteClick';
import useBIPageViews from './usePageViews';
import useBIRankClicks from './useRankClicks';
import useBIWebsiteClicks from './useWebsiteClicks';
import useBIWhatsappQuery from './useWhatsappQuery';
import useBusiness from '../useBusiness';
import { useMemo } from 'react';

type Output = {
  data: Record<string, number> | undefined;
  overall: () => string | number;
  isLoading?: boolean;
};
const useBusinessAnalytics = (
  fromDate: moment.Moment,
  toDate: moment.Moment
): Record<AnalyticsAvailableKeys | AnalyticsChartsKeys, Output> => {
  const { data: selectedBusiness } = useBusiness();

  const from = fromDate.unix();
  const to = toDate.clone().add(1, 'days').unix();

  const pageViews = useBIPageViews(from, to);

  const rankClicks = useBIRankClicks(from, to);

  const callRequests = useBICallRequests(from, to);

  const whatsappClicks = useBIWhatsappQuery(from, to);

  const imageviewClicks = useBIImageviewClicks(from, to);

  const websiteClicks = useBIWebsiteClicks(from, to);

  const pageRouteClicks = useBIPageRouteClick(from, to);

  const averagePositions = useBIAveragePositions(from, to);

  const callRequestsOnPageClick = useMemo(() => {
    if (!rankClicks.isLoading && !callRequests.isLoading) {
      const result: Record<string, number> = {};
      const iterationCount = toDate.diff(fromDate) / (3600 * 24000);

      for (let i = 0; i < iterationCount; i++) {
        const key = moment(fromDate).add(i, 'days').format('YYYY-MM-DD');
        result[key] = Number(callRequests.data?.[key] || 0) / Number(rankClicks.data?.[key] || 1);
      }

      return result;
    }
  }, [from, to, selectedBusiness?.slug, callRequests.isLoading, rankClicks.isLoading]);

  return {
    pageViews,
    rankClicks,
    callRequests,
    whatsappClicks,
    imageviewClicks,
    websiteClicks,
    averagePositions,
    pageRouteClicks,
    callRequestsOnPageClick: {
      data: callRequestsOnPageClick,
      overall: () =>
        ((
          ((sum(Object.values(callRequests.data || [])) || 0) /
            sum(Object.values(rankClicks.data || [])) || 1) * 100
        ).toFixed(1) || 0) + '%',
      isLoading: callRequests.isLoading && rankClicks.isLoading
    }
  };
};
export default useBusinessAnalytics;
