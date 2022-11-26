import { BusinessType } from '@typings/Business';
import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export default async function userBusinesses() {
  try {
    return (
      await Http.get<BusinessType[]>({
        url: endpoints.userBusinesses
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
