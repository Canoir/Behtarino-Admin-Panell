import { ADS_REPORT_QUERY_KEY } from '@constants/queryKeys';
import { AdsReport } from '@typings/Ads';
import AdsServices from '@services/ads';
import useBusiness from './useBusiness';
import { useQuery } from 'react-query';

const useAdsReport = () => {
  const { data: selectedBusiness } = useBusiness();

  const { data, refetch } = useQuery<AdsReport, Error>(
    [ADS_REPORT_QUERY_KEY, selectedBusiness?.slug],
    async () => AdsServices.report(selectedBusiness?.slug || ''),
    {
      enabled: !!selectedBusiness?.slug
    }
  );

  return { data, slug: selectedBusiness?.slug, refetch };
};
export default useAdsReport;
