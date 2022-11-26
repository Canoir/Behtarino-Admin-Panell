import { AveragePositionDetails } from '@typings/Analystic';
import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export async function getAveragePositionDetails(
  slug: string,
  { from, to }: { from: number; to: number }
) {
  try {
    return (
      await Http.get<AveragePositionDetails>({
        url: endpoints.getAveragePositionDetails(slug),
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
