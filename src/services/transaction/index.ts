import { createPackageTransaction } from './createPackage';
import { getGatewayFromTransaction } from './getGateway';

const TransactionServices = {
  createPackage: createPackageTransaction,
  getGateway: getGatewayFromTransaction
};
export default TransactionServices;
