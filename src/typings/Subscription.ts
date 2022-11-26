import moment from 'moment-jalaali';

export const Subscription_VIP = 'vip';
export const Subscription_Expert = 'expert';
export const Subscription_FREE = 'free';

export type SubscriptionType = 'vip' | 'expert' | 'free';

export const SubscriptionTypeStaticDetails = {
  [Subscription_VIP]: {
    title: 'VIP'
  },
  [Subscription_Expert]: {
    title: 'پیشرفته'
  },
  [Subscription_FREE]: {
    title: 'ساده'
  }
};

export type SubscriptionDetails = {
  contract?: number;
  plan: SubscriptionType;
  start: string | Date | moment.Moment;
  end: string | Date | moment.Moment;
};
export interface Subscription {
  can_have_fifty_percent_discount: boolean;
  had_subscription_before: boolean;
  reserve_subscription_details: SubscriptionDetails;
  subscription_details: SubscriptionDetails;
}

export type SubscriptionRenewalType = Record<
  number,
  Record<SubscriptionType, Record<number, { price: number }>>
>;
export const SubscriptionRenewalData: SubscriptionRenewalType = {
  7: {
    vip: {
      3: { price: 100_000 },
      6: { price: 150_000 },
      12: { price: 300_000 }
    },
    expert: {
      3: { price: 50_000 },
      6: { price: 100_000 },
      12: { price: 200_000 }
    },
    free: {
      3: { price: 0 },
      6: { price: 0 },
      12: { price: 0 }
    }
  },
  14: {
    vip: {
      3: { price: 150_000 },
      6: { price: 300_000 },
      12: { price: 500_000 }
    },
    expert: {
      3: { price: 100_000 },
      6: { price: 150_000 },
      12: { price: 300_000 }
    },
    free: {
      3: { price: 0 },
      6: { price: 0 },
      12: { price: 0 }
    }
  }
};
