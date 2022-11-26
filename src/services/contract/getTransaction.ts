import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export async function getContractFromContractDetails(
  slug: string,
  details: {
    duration: '3' | '6' | '12';
    plan: 'expert' | 'free' | 'vip';
  }
) {
  try {
    return (
      await Http.post<{ contract: number }>({
        url: endpoints.getContractFromInfo(slug),
        data: {
          duration: details.duration,
          plan: details.plan,
          source: 'activation'
        }
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
