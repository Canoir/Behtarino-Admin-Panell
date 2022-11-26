import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export async function getAveragePosition(slug: string, { from, to }: { from: number; to: number }) {
  try {
    return (
      await Http.get<Record<string, number>>({
        url: endpoints.averagePositions(slug),
        params: {
          from_date: from,
          to_date: to
        }
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
