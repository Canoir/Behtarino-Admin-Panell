import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export async function getMailUnreadCounts(slug: string): Promise<number> {
  try {
    return (
      await Http.get<{ unread_messages_count: number }>({
        url: endpoints.getUnreadMessages(slug)
      })
    ).data?.unread_messages_count;
  } catch (error) {
    throw error;
  }
}
