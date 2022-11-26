import { SubscriptionType } from './Subscription';

export interface AdsReport {
  acception_state: number;
  balance: number;
  had_advertise_before: boolean;
  is_active: boolean;
  max_click_price: number;
  radius: number;
  subscription_type: SubscriptionType;
}

export interface AdsPackage {
  suggested_packes: AdsPackageSingle[] | [];
}

export type AdsPackageSingle = {
  code: string;
  id: number | null;
  amount: number;
  giftPercentage: { free: number; expert: number; vip: number };
};
