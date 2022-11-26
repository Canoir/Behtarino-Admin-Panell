import { Contract } from '@typings/Contract';
import Http from '@utils/Http';
import endpoints from '@constants/endpoints';

export async function getContractsFromContractId(id: string) {
  try {
    return (
      await Http.get<Contract>({
        url: endpoints.getContract(id)
      })
    ).data;
  } catch (error) {
    throw error;
  }
}
