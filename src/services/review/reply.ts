import Http from '@utils/Http';
import { Response } from '@typings/_Global';
import endpoints from '@constants/endpoints';

export default async function submitReview(
  review_id: number,
  comment: string
): Promise<Response<void>> {
  try {
    return await Http.post<void>({
      url: endpoints.submitReviewReply(review_id),
      data: { comment }
    });
  } catch (error) {
    throw error;
  }
}
