import Http from '@utils/Http';
import { Mail } from '@typings/Mail';
import endpoints from '@constants/endpoints';

export async function getMailFromId(id: string, slug: string): Promise<Mail> {
  try {
    return (
      await Http.get<Mail>({
        url: endpoints.getMail(id, slug)
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
