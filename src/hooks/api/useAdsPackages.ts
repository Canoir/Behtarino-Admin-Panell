import { ADS_PACKAGES_QUERY_KEY } from '@constants/queryKeys';
import { AdsPackage } from '@typings/Ads';
import AdsServices from '@services/ads';
import useBusiness from './useBusiness';
import { useQuery } from 'react-query';

const useAdsSuggestedPackages = () => {
  const { data: selectedBusiness } = useBusiness();

  const { data } = useQuery<AdsPackage, Error>(
    [ADS_PACKAGES_QUERY_KEY, selectedBusiness?.slug],
    async () => AdsServices.packages(selectedBusiness?.slug || ''),
    {
      enabled: !!selectedBusiness?.slug
    }
  );

  return { data };
};
export default useAdsSuggestedPackages;
