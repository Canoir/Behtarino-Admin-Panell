import { AdsReport } from '@typings/Ads';
import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export async function patchAdsSettings(slug: string, data: Partial<AdsReport>) {
  try {
    return (
      await Http.patch<void>({
        url: endpoints.updateAdsSettings(slug),
        data
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
