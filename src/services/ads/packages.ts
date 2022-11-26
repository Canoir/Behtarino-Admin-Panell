import { AdsPackage } from '@typings/Ads';

// import Http from '@utils/Http';
// import endpoints from '@constants/endpoints';

export async function getAdsSuggestedPackages(slug: string) {
  try {
    console.log(slug);

    return {
      suggested_packes: [
        {
          id: 1,
          code: '2001',
          amount: 345 * 1000,
          giftPercentage: { free: 0, expert: 20, vip: 30 }
        },
        {
          id: 2,
          code: '2002',
          amount: 810 * 1000,
          giftPercentage: { free: 15, expert: 35, vip: 50 }
        },
        {
          id: 3,
          code: '2003',
          amount: 109 * 10000,
          giftPercentage: { free: 30, expert: 45, vip: 60 }
        }
      ]
    } as AdsPackage;

    // return {
    //   suggested_packes: []
    // }
    // return (await Http.get<AdsPackage>({
    //   url: endpoints.getAdsSuggestedPackages(slug)
    // })).data;
  } catch (error) {
    throw error;
  }
}
