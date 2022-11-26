import { BusinessFullDetails } from '@typings/Business';
import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export default async function getFullDetails(slug: string) {
  try {
    return (
      await Http.get<BusinessFullDetails>({
        url: endpoints.getBusinessFullDetails(slug)
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
