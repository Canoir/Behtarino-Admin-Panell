import Http from '@utils/Http';
import { Subscription } from '@typings/Subscription';
import endpoints from '@constants/endpoints';

export default async function getSubscription(slug: string): Promise<Subscription | null> {
  try {
    return (
      await Http.get<Subscription>({
        url: endpoints.getSubscription(slug)
      })
    ).data;
  } catch (error) {
    return null;
  }
}
