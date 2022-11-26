import { BusinessType } from '@typings/Business';
import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export default async function getBusiness(slug: string) {
  try {
    return (
      await Http.get<BusinessType>({
        url: endpoints.businessInfo(slug)
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
