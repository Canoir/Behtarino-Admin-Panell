import Http from '@utils/Http';
import { User } from '@typings/User';
import endpoints from '@constants/endpoints';

export default async function userSelf(): Promise<User | null> {
  try {
    return (
      await Http.get<User>({
        url: endpoints.userInfo
      })
    ).data;
  } catch (error) {
    return null;
  }
}
