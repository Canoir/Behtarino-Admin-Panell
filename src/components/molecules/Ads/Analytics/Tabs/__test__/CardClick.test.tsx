import render, { screen } from '@helpers/test';

import { BusinessReportType } from '@typings/Business';
import { CARD_CLICK } from '@constants/test';
import CardClick from '../CardClick';
import moment from 'moment-jalaali';

describe('Card Click Tab', () => {
  const sampleBizReportData: BusinessReportType[] = [
    {
      average_position: 1,
      business_slug: 'asd',
      click_cost: 2000,
      click_count: 2,
      details: [{ cost: 1000, count: 1, previous_page: 'asd', sum_position: 2 }],
      click_type: 2,
      id: 1,
      timestamp: 123
    }
  ];

  test('Footer Title Check', async () => {
    render(
      <CardClick businessReport={sampleBizReportData} endDate={moment()} startDate={moment()} />
    );

    const titles = await screen.findAllByTestId(CARD_CLICK.footerTitle);

    expect(titles?.[0]).toHaveTextContent('مجموع هزینه‌ها:');
    expect(titles?.[1]).toHaveTextContent('مجموع کلیک‌ها:');
  });
});
