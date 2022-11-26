import { BusinessTypePatch } from '@typings/Business';
import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export default async function getUnApprovedBusiness(slug: string) {
  try {
    return (
      await Http.get<BusinessTypePatch[]>({
        url: endpoints.unapprovedBusinessEdits,
        params: { business_slug: slug }
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
