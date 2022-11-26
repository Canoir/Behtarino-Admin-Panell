import { USER_BUSINESSES_QUERY_KEY, USER_QUERY_KEY } from '@constants/queryKeys';

import { BusinessType } from '@typings/Business';
import UserServices from '@services/user';
import { useQuery } from 'react-query';
import { useState } from 'react';

const useUser = () => {
  const {
    data: info,
    isLoading: isInfoLoading,
    refetch: refetchSelf
  } = useQuery(USER_QUERY_KEY, UserServices.self);

  const [lastLocation, setLastLocation] = useState<string>('');

  function isAuthenticated(location: string) {
    if (lastLocation !== location) {
      refetchSelf();
      setLastLocation(location);
    }
  }

  const {
    data: businesses,
    isLoading: isBusinessLoading,
    refetch
  } = useQuery<Partial<BusinessType & { main_image_thumbnail_url: string }>[], Error>(
    USER_BUSINESSES_QUERY_KEY,
    UserServices.businesses
  );

  return {
    info,
    businesses,
    refetch,
    isAuthenticated,
    isLoading: isInfoLoading && isBusinessLoading
  };
};
export default useUser;
