import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export async function getRecommendedClicks(slug: string) {
  try {
    return (
      await Http.get<{ click_price_recommendation: number }>({
        url: endpoints.getRecommendedClickPrice(slug)
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
