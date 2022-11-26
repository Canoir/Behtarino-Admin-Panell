import Http from '@utils/Http';
import TagType from '@typings/Tag';
import endpoints from '@constants/endpoints';

export default async function searchTags(search: string) {
  try {
    return (
      await Http.get<TagType[]>({
        url: endpoints.searchTags,
        params: { search }
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
