import { BusinessReportClickType, BusinessReportType } from '@typings/Business';

import { BUSINESS_REPORT_QUERY_KEY } from '@constants/queryKeys';
import BusinessServices from '@services/business';
import useBusiness from './useBusiness';
import { useQuery } from 'react-query';
import useUser from '@hooks/api/useUser';

type Arguments = {
  startDate: number;
  endDate: number;
  currentTab: string;
};

const useBusinessReport = (args: Arguments) => {
  const { businesses } = useUser();
  const { data: selectedBusiness } = useBusiness();

  const selectedTab =
    args.currentTab === '2'
      ? BusinessReportClickType.CALL_REQUEST
      : args.currentTab === '1'
      ? BusinessReportClickType.NAVIGATION
      : BusinessReportClickType.CLICK_ON_CARD;

  const { data, isLoading } = useQuery<BusinessReportType[], Error>(
    [BUSINESS_REPORT_QUERY_KEY, selectedBusiness?.slug, selectedTab, args.startDate, args.endDate],
    async () =>
      BusinessServices.report(
        selectedBusiness?.slug || businesses?.[0]?.slug || '',
        args.startDate,
        args.endDate,
        selectedTab
      ),
    {
      enabled: !!selectedBusiness?.slug
    }
  );

  return { data, isLoading };
};
export default useBusinessReport;
