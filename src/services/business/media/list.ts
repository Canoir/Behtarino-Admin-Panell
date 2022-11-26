import Http from '@utils/Http';
import { ImageType } from '@typings/Image';
import endpoints from '@constants/endpoints';

export default async function getBusinessMedias(slug: string) {
  try {
    return (
      await Http.get<ImageType[]>({
        url: endpoints.getBusinessPosts(slug)
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
