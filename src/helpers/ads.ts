import { SubscriptionType } from '@typings/Subscription';

export function calculatePriceRange(radius: number, subscriptionType?: SubscriptionType): number {
  const score = {
    vip: 1.6,
    expert: 1.2,
    free: 1
  };

  return Math.round(1500 / ((2 / radius) * score[subscriptionType || 'free']) / 500) * 500;
}
