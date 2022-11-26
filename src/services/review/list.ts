import Http from '@utils/Http';
import { Response } from '@typings/_Global';
import { Review } from '@typings/Review';
import endpoints from '@constants/endpoints';

export default async function getReviewList(
  slug: string,
  url?: string,
  order?: string
): Promise<Response<Review[]>> {
  try {
    return await Http.get<Review[]>({
      url: url || endpoints.getReviews(slug),
      params: { ordering: [order, '-created_at'] }
    });
  } catch (error) {
    throw error;
  }
}
