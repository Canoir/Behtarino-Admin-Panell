import Http from '@utils/Http';
import { ImageType } from '@typings/Image';
import endpoints from '@constants/endpoints';

export default async function createBusinessMedia(
  params: Partial<ImageType> & { businessId: number }
) {
  try {
    const { businessId: business, image, video } = params;

    return (
      await Http.post<ImageType>({
        url: endpoints.posts,
        data: { business, image, video }
      })
    ).data;
  } catch (e) {
    throw e;
  }
}
