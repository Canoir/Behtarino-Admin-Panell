import { CreatePackageTransaction } from '@typings/Transaction';
import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export async function createPackageTransaction(code: string, slug: string) {
  try {
    return (
      await Http.post<CreatePackageTransaction>({
        url: endpoints.createPackageTransaction(slug),
        data: {
          service_code: code
        }
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
