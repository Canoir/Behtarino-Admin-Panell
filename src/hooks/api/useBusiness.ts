import { BUSINESS_QUERY_KEY, UNAPPROVED_BUSINESS_QUERY_KEY } from '@constants/queryKeys';
import { BusinessType, BusinessTypePatch } from '@typings/Business';

import BusinessServices from '@services/business';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import useUser from '@hooks/api/useUser';

const useBusiness = () => {
  const { businesses } = useUser();

  const { data, refetch, isLoading } = useQuery<BusinessType, Error>(
    [BUSINESS_QUERY_KEY, localStorage.getItem('selectedBusiness')],
    async () =>
      BusinessServices.get(localStorage.getItem('selectedBusiness') || businesses?.[0]?.slug || ''),
    {
      enabled: Boolean(localStorage.getItem('selectedBusiness') || businesses?.[0]?.slug)
    }
  );

  const { data: unapproved_by_business, refetch: unapprovedRefetch } = useQuery<
    BusinessTypePatch[],
    Error
  >(
    [UNAPPROVED_BUSINESS_QUERY_KEY, localStorage.getItem('selectedBusiness')],
    async () => BusinessServices.unapproved(localStorage.getItem('selectedBusiness') || ''),
    {
      enabled: Boolean(localStorage.getItem('selectedBusiness') || businesses?.[0]?.slug)
    }
  );

  const setSelectedAccount = (slug: string) => {
    localStorage.setItem('selectedBusiness', slug);
    refetch();
  };

  function getBusinessAcceptanceTitle() {
    if (data) {
      const acceptanceTitles = [
        'درحال بررسی',
        'تایید شده',
        'درحال بررسی',
        'درحال بررسی',
        'خارج از دسترس',
        'درحال بررسی',
        'درحال بررسی',
        'درحال بررسی'
      ];

      return acceptanceTitles[data.acception_state];
    }

    return '...';
  }

  const businessFinalData = useMemo<BusinessType>(() => {
    const baseData = { ...unapproved_by_business?.[0] };
    for (const _key in baseData) {
      const key = _key as keyof typeof baseData;

      if (
        !baseData[key] ||
        (Array.isArray(baseData[key]) && !(baseData[key] as Array<unknown>).length)
      )
        delete baseData[key];
    }
    delete baseData['id'];

    return { ...data, ...(baseData as unknown as BusinessType) };
  }, [unapproved_by_business, data]);

  return {
    data: businessFinalData,
    refetch: () => {
      refetch();
      unapprovedRefetch();
    },
    setSelectedAccount,
    businesses,
    isLoading,
    isUnApproved: !!unapproved_by_business?.length,
    getBusinessAcceptanceTitle
  };
};
export default useBusiness;
