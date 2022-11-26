import { lazy, useEffect } from 'react';

import { Box } from '@mui/material';
import { Review } from '@typings/Review';
import ReviewComment from './Comment';
import ReviewFeedback from './Feedback';
import { useInView } from 'react-intersection-observer';
import useToggle from '@hooks/useToggle';

const ReviewSubmitReplyOverlay = lazy(() => import(/* webpackPrefetch: true */ './Overlay/Reply'));

type Props = { review: Review; isLastReplyItem?: () => void; refetch: () => void };

export default function ReviewItem(props: Props) {
  const { review, isLastReplyItem, refetch } = props;
  const { comment, creator_name, rate } = review || {};

  const [isOpen, toggleOpen] = useToggle(false);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) isLastReplyItem?.();
  }, [inView, isLastReplyItem]);

  return (
    <Box
      my={3}
      border={(theme) => '1px solid ' + theme.palette.divider}
      borderRadius={1}
      p={3}
      ref={ref}>
      <ReviewSubmitReplyOverlay
        open={isOpen}
        onClose={() => {
          toggleOpen();
          refetch();
        }}
        review={review}
      />

      <ReviewComment comment={comment} creatorName={creator_name} rate={rate} />

      <ReviewFeedback review={review} toggleOpen={toggleOpen} />
    </Box>
  );
}