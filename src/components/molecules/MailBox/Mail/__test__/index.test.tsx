import render, { fireEvent, screen } from '@helpers/test';

import { MAILS } from '@constants/test';
import MailBoxMail from '..';
import moment from 'moment-jalaali';

describe('Mail Item', () => {
  test('Label in Items', () => {
    render(
      <MailBoxMail
        mail={{
          label: 'تبلیغات',
          id: 1,
          created_at: moment('2022-09-20'),
          text: `نام کاربر عزیز
شارژ هدیه تبلیغات برای تمدید زودتر از موعد تا سقف ھشتصد ھزار تومان، فقط تا پایان امروز معتبر است و از آن پس عضویت نام کسب‌و‌کار با تعرفه عادی محاسبه می‌شود.
:لینک تمدید عضویت ویژه در بهترینو
https://as.behtarino.com/setting`,
          is_read: false
        }}
      />
    );

    const label = screen.getByText('تبلیغات');

    expect(label).toBeInTheDocument();
  });

  test('Description in Items', async () => {
    render(
      <MailBoxMail
        mail={{
          label: 'تبلیغات',
          id: 1,
          created_at: moment('2022-09-20'),
          text: `نام کاربر عزیز شارژ هدیه تبلیغات برای تمدید زودتر از موعد تا سقف ھشتصد ھزار تومان، فقط تا پایان امروز معتبر است و از آن پس عضویت نام کسب‌و‌کار با تعرفه عادی محاسبه می‌شود. :لینک تمدید عضویت ویژه در بهترینوhttps://as.behtarino.com/settings`,
          is_read: false
        }}
      />
    );

    const description = await screen.findByTestId(MAILS.description);

    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      `نام کاربر عزیز شارژ هدیه تبلیغات برای تمدید زودتر از موعد تا سقف ھشتصد ھزار تومان، فقط تا پایان امروز معتبر است و از آن پس عضویت نام کسب‌و‌کار با تعرفه عادی محاسبه می‌شود. :لینک تمدید عضویت ویژه در بهترینوhttps://as.behtarino.com/settings`.slice(
        0,
        64
      ) + ' ...'
    );
  });

  test('Date in Items', async () => {
    render(
      <MailBoxMail
        mail={{
          label: 'تبلیغات',
          id: 1,
          created_at: moment('2022-09-20'),
          text: `نام کاربر عزیز شارژ هدیه تبلیغات برای تمدید زودتر از موعد تا سقف ھشتصد ھزار تومان، فقط تا پایان امروز معتبر است و از آن پس عضویت نام کسب‌و‌کار با تعرفه عادی محاسبه می‌شود. :لینک تمدید عضویت ویژه در بهترینوhttps://as.behtarino.com/settings`,
          is_read: false
        }}
      />
    );

    const container = await screen.findByTestId(MAILS.dateContainer);
    const date = await screen.findByTestId(MAILS.date);
    const hour = await screen.findByTestId(MAILS.hour);

    expect(container).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(hour).toBeInTheDocument();

    expect(date).toHaveTextContent('1401/06/29');
    expect(container).toContainElement(date);
    expect(hour).toHaveTextContent('00:00');
    expect(container).toContainElement(hour);
  });

  test('Detail Sheet onClick', async () => {
    render(
      <MailBoxMail
        mail={{
          label: 'تبلیغات',
          id: 1,
          created_at: moment('2022-09-20'),
          text: `نام کاربر عزیز شارژ هدیه تبلیغات برای تمدید زودتر از موعد تا سقف ھشتصد ھزار تومان، فقط تا پایان امروز معتبر است و از آن پس عضویت نام کسب‌و‌کار با تعرفه عادی محاسبه می‌شود. :لینک تمدید عضویت ویژه در بهترینوhttps://as.behtarino.com/settings`,
          is_read: false
        }}
      />
    );

    const container = await screen.findByTestId(MAILS.card);
    expect(container).toBeInTheDocument();

    fireEvent.click(container);

    const detailsModals = await screen.findAllByTestId(MAILS.modal.details.container);
    const detailsTexts = await screen.findAllByTestId(MAILS.modal.details.text);
    const links = await screen.findAllByTestId(MAILS.link);

    expect(detailsModals[0]).toBeInTheDocument();
    expect(detailsTexts[0]).toBeInTheDocument();

    expect(detailsTexts[0]).toHaveTextContent(
      `نام کاربر عزیز شارژ هدیه تبلیغات برای تمدید زودتر از موعد تا سقف ھشتصد ھزار تومان، فقط تا پایان امروز معتبر است و از آن پس عضویت نام کسب‌و‌کار با تعرفه عادی محاسبه می‌شود. :لینک تمدید عضویت ویژه در بهترینوhttps://as.behtarino.com/settings`
    );

    expect(links[0]).toBeInTheDocument();
    expect(links[0]).toHaveTextContent('https://as.behtarino.com/setting');
    expect(detailsTexts[0]).toContainElement(links[0]);
  });
});
