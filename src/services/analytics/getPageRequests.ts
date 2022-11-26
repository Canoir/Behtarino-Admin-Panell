import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export async function getBizPageRequests(slug: string, { from, to }: { from: number; to: number }) {
  try {
    return (
      await Http.get<Record<string, number>>({
        url: endpoints.analyticByEventName(slug),
        params: {
          event_name: 'business_page_call_request',
          from_date: from,
          to_date: to
        }
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
