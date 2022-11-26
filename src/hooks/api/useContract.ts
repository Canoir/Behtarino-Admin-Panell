import { ADS_REPORT_QUERY_KEY } from '@constants/queryKeys';
import { Contract } from '@typings/Contract';
import ContractServices from '@services/contract';
import { useQuery } from 'react-query';

const useContract = (id?: string) => {
  const { data } = useQuery<Contract, Error>(
    [ADS_REPORT_QUERY_KEY, id],
    async () => ContractServices.get(id || ''),
    {
      enabled: !!id
    }
  );

  return { data };
};
export default useContract;
