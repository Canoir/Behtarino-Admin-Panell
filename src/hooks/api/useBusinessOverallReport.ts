import { ADS_REPORT_OVERALL_QUERY_KEY } from '@constants/queryKeys';
import AdsServices from '@services/ads';
import { BusinessOverallReport } from '@typings/Business';
import useBusiness from './useBusiness';
import { useQuery } from 'react-query';

const useBusinessOverallReport = () => {
  const { data: selectedBusiness } = useBusiness();

  const { data } = useQuery<BusinessOverallReport, Error>(
    [ADS_REPORT_OVERALL_QUERY_KEY, selectedBusiness?.slug],
    async () => AdsServices.overAllReport(selectedBusiness?.slug || ''),
    {
      enabled: !!selectedBusiness?.slug
    }
  );

  return { data };
};
export default useBusinessOverallReport;
