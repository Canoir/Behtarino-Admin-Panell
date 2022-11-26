import { ANALYTICS_OVERALL_INFO } from '@constants/test';
import AnalyticsOverallInfo from '../Info';
import moment from 'moment-jalaali';
import render from '@helpers/test';

describe('Overall Analytics Info', () => {
  test('Contain callRequestsOnPageClick', async () => {
    const { findAllByTestId } = render(
      <AnalyticsOverallInfo
        fromDate={moment()}
        toDate={moment()}
        selectedKeys={['callRequestsOnPageClick']}
      />
    );
    const titles = await findAllByTestId(ANALYTICS_OVERALL_INFO.title);
    const values = await findAllByTestId(ANALYTICS_OVERALL_INFO.value);

    const index = Array.from(titles).findIndex((item) => {
      return item.innerHTML === 'نسبت تماس به کلیک روی کارت';
    });

    expect(index).toBeGreaterThanOrEqual(0);
    expect(titles[index]).toHaveTextContent('نسبت تماس به کلیک روی کارت');
    expect(values[index]).toHaveTextContent('0%');
  });
});
