import { BUSINESS_FULL_DETAILS_QUERY_KEY } from '@constants/queryKeys';
import { BusinessFullDetails } from '@typings/Business';
import BusinessServices from '@services/business';
import useBusiness from '@hooks/api/useBusiness';
import { useQuery } from 'react-query';

const useBusinessFullDetails = () => {
  const { data: business } = useBusiness();

  const { data } = useQuery<BusinessFullDetails, Error>(
    [BUSINESS_FULL_DETAILS_QUERY_KEY, business?.slug],
    async () => BusinessServices.getFull(business?.slug || ''),
    {
      enabled: !!business?.slug
    }
  );

  return { data };
};
export default useBusinessFullDetails;
