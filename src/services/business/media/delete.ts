import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export default async function deleteBusinessMedia(businessImageId: number) {
  try {
    return (
      await Http.delete({
        url: endpoints.postsItem(businessImageId)
      })
    ).data;
  } catch (e) {
    throw e;
  }
}
