import { BusinessOverallReport } from '@typings/Business';
import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export async function getAdsOverallReport(slug: string) {
  try {
    return (await Http.get<BusinessOverallReport>({
      url: endpoints.getBusinessOverallReport(slug)
    })).data;
  } catch (error) {
    throw error;
  }
}
