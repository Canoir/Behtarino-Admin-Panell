import { GatewayFromTransaction } from '@typings/Transaction';
import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export async function getGatewayFromTransaction(transaction_code: number) {
  try {
    return (
      await Http.get<GatewayFromTransaction>({
        url: endpoints.getGatewayFromTransaction(transaction_code)
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
