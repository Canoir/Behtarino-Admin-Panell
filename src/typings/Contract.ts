import { SubscriptionType } from './Subscription';

export interface Contract {
  id: number;
  amount: number;
  contract_title: string;
  discount: number;
  duration: number;
  gift_amount: number | null;
  first_due_transaction: Transaction;
  plan: SubscriptionType;
  behtarino_transactions: Transaction[];
}

export interface Transaction {
  amount: number;
  due_date: string | null;
  status: number | null;
  _transaction_id: string;
}
