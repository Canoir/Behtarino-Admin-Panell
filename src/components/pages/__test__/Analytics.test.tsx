import render, { screen } from '@helpers/test';

import AnalyticsPage from '../Analytics';
import { DATE_PICKER } from '@constants/test';
import moment from 'moment-jalaali';

describe('Analytics Page', () => {
  test('Filter should be yesterday', async () => {
    render(<AnalyticsPage />);

    const titles = await screen.findAllByTestId(DATE_PICKER.openButton);

    expect(titles?.[0]).toHaveTextContent(
      `از تاریخ: ${moment().startOf('day').subtract(31, 'days').format('jYYYY/jM/jD')}`
    );
    expect(titles?.[1]).toHaveTextContent(
      `تا تاریخ: ${moment().startOf('day').subtract(1, 'days').format('jYYYY/jM/jD')}`
    );
  });
});
