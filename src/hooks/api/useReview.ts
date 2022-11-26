import { REVIEW_QUERY_KEY } from '@constants/queryKeys';
import { Response } from '@typings/_Global';
import { Review } from '@typings/Review';
import ReviewService from '@services/review';
import useBusiness from './useBusiness';
import { useInfiniteQuery } from 'react-query';
import useToggle from '@hooks/useToggle';

const useReview = (order?: string) => {
  const { data: selectedBusiness } = useBusiness();
  const [replied, toggleReplied] = useToggle(false);

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<
    Response<Review[]> | null,
    Error
  >(
    [REVIEW_QUERY_KEY, selectedBusiness?.slug, replied, order],
    async ({ pageParam }) => ReviewService.list(selectedBusiness?.slug || '', pageParam, order),
    {
      getNextPageParam: (lastPage) => lastPage?.pagination?.next,
      enabled: !!selectedBusiness?.slug
    }
  );

  return {
    data: data?.pages as Response<Review[]>[],
    fetchNextPage: () => hasNextPage && !isLoading && !isFetching && fetchNextPage(),
    isLoading: isLoading || isFetching,
    refetch: toggleReplied
  };
};
export default useReview;
