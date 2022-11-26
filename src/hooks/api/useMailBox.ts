import { MAILBOX_QUERY_KEY, MAILBOX_UNREAD_QUERY_KEY } from '@constants/queryKeys';
import { useInfiniteQuery, useQuery } from 'react-query';

import { MailBox } from '@typings/Mail';
import MailBoxServices from '@services/mailbox';
import { ROUTES } from '@constants/routes';
import { Response } from '@typings/_Global';
import useBusiness from './useBusiness';
import { useLocation } from 'react-router-dom';

const useMailBox = () => {
  const { data: business } = useBusiness();
  const { pathname } = useLocation();

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<
    Response<MailBox>,
    Error
  >(
    [MAILBOX_QUERY_KEY, business?.slug, pathname === ROUTES.MAILBOX],
    async () => MailBoxServices.list(business?.slug || ''),
    {
      getNextPageParam: (lastPage) => lastPage?.pagination?.next,
      enabled: !!business?.slug
    }
  );

  const { data: hasUnread, isLoading: isCountUnreadLoading } = useQuery<number, Error>(
    [MAILBOX_UNREAD_QUERY_KEY, business?.slug, pathname],
    async () => MailBoxServices.countUnread(business?.slug || ''),
    {
      enabled: !!business?.slug
    }
  );

  return {
    data,
    hasUnread,
    isLoading: isLoading && isCountUnreadLoading,
    fetchNextPage: () => hasNextPage && !isLoading && !isFetching && fetchNextPage()
  };
};
export default useMailBox;
