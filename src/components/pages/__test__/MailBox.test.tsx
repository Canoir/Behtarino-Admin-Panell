import MailBox from '../MailBox';
import render from '@helpers/test';

describe('Mail Box', () => {
  test('Card Title', async () => {
    const { findByText } = render(<MailBox />);

    const title = await findByText('صندوق پیام‌ها');

    expect(title).toBeInTheDocument();
  });
});
