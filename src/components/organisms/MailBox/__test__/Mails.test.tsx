import { GENERAL, MAILS } from '@constants/test';
import render, { screen } from '@helpers/test';

import MailBoxItems from '../Mails';
import moment from 'moment-jalaali';

describe('Mails', () => {
  test('Loading', async () => {
    const { findByTestId } = render(
      <MailBoxItems
        __test__={{
          data: { pages: [], pageParams: [] },
          isLoading: true
        }}
      />
    );

    const loading = await findByTestId(GENERAL.loading);

    expect(loading).toBeInTheDocument();
  });

  test('No Data', async () => {
    const { findByTestId } = render(
      <MailBoxItems
        __test__={{
          data: { pages: [], pageParams: [] },
          isLoading: false
        }}
      />
    );

    const noData = await findByTestId(MAILS.noData);

    expect(noData).toBeInTheDocument();
  });
});
