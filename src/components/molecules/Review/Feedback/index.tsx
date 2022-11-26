import { Review } from '@typings/Review';
import ReviewFeedbackReply from './Reply';
import Votes from './Votes';
import { When } from 'react-if';
import moment from 'moment-jalaali';

type Props = { review: Review; toggleOpen: () => void };
function ReviewFeedback({ review, toggleOpen }: Props) {
  const { created_at, down_votes_count, up_votes_count, reply } = review;
  //
  return (
    <>
      <Votes
        date={created_at || moment()}
        downVote={down_votes_count}
        upVote={up_votes_count}
        hasReply={!!reply}
        toggleOverlay={toggleOpen}
      />

      <When condition={reply}>
        <ReviewFeedbackReply reply={reply!} />
      </When>
    </>
  );
}

export default ReviewFeedback;
