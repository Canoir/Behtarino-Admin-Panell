import render, { screen } from '@helpers/test';

import { HEADER } from '@constants/test';
import Header from '../Header';
import noop from '@utils/noop';

describe('Header', () => {
  test('Show New Message', async () => {
    render(<Header toggleSidebar={noop} isSecondaryPage={false} __test__={{ hasUnread: 209 }} />);

    const dot = await screen.findAllByTestId(HEADER.notificationDot);
    expect(dot[0]).toBeInTheDocument();
  });

  test("Don't Show New Message Dot", async () => {
    render(<Header toggleSidebar={noop} isSecondaryPage={false} __test__={{ hasUnread: 0 }} />);

    const dot = screen.queryAllByTestId(HEADER.notificationDot);
    if (dot?.[0]) expect(dot[0]).not.toBeInTheDocument();

    const ring = await screen.findAllByTestId(HEADER.notificationRing);
    expect(ring[0]).toBeInTheDocument();
  });
});
