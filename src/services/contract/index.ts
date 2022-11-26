import { getContractFromContractDetails } from './getTransaction';
import { getContractsFromContractId } from './get';

const ContractServices = {
  get: getContractsFromContractId,
  getContractId: getContractFromContractDetails
};
export default ContractServices;
