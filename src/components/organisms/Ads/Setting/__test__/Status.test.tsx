import render, { screen } from '@helpers/test';
import AdsSettingStatus from '@organs/Ads/Setting/Status';
import { ADS } from '@constants/test';
import { Subscription_VIP } from '@typings/Subscription';

describe('Status Section', () => {
  it('High Balance', async () => {
    render(<AdsSettingStatus __test__={{ balance: 100 }} />);
    const button = await screen.queryByTestId(ADS.buyAds);
    expect(button).not.toBeInTheDocument();
  });
  it('Low Balance', async () => {
    render(<AdsSettingStatus __test__={{ balance: -50 }} />);
    const button = await screen.findByTestId(ADS.buyAds);
    expect(button).toBeInTheDocument();
  });
});
