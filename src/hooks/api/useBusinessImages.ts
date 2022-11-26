import { BUSINESS_IMAGES_QUERY_KEY } from '@constants/queryKeys';
import BusinessServices from '@services/business';
import { ImageType } from '@typings/Image';
import useBusiness from '@hooks/api/useBusiness';
import { useQuery } from 'react-query';

const useBusinessImages = () => {
  const { data: business } = useBusiness();
  const { data, refetch, isLoading } = useQuery<ImageType[], Error>(
    [BUSINESS_IMAGES_QUERY_KEY, business?.slug],
    async () => BusinessServices.images(business?.slug || ''),
    {
      enabled: !!business?.slug
    }
  );

  return { data, refetch, isLoading };
};
export default useBusinessImages;
