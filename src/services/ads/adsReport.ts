import { AdsReport } from '@typings/Ads';
import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export async function getAdsReport(slug: string) {
  try {
    return (
      await Http.get<AdsReport>({
        url: endpoints.getAdsReport(slug)
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
