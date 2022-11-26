import render, { fireEvent, screen } from '@helpers/test';

import { PHONE_OVERLAY } from '@constants/test';
import SettingPhoneOverlay from '../Phone';
import noop from '@utils/noop';

describe('Biz Setting Edit Phone Number Modal', () => {
  test('Show Singular', async () => {
    function Component() {
      return (
        <SettingPhoneOverlay
          open
          onClose={noop}
          __test__={{
            id: 1,
            phone_zero_starts: '09187026684',
            more_phone_numbers: '',
            slug: 'asdfhghjk'
          }}
        />
      );
    }
    render(<Component />);

    const inputs = await screen.findAllByTestId(PHONE_OVERLAY.input);

    expect(inputs[0]).toHaveValue('09187026684');
  });

  test('Show Multiple', async () => {
    function Component() {
      return (
        <SettingPhoneOverlay
          open
          onClose={noop}
          __test__={{
            id: 1,
            phone_zero_starts: '09187026684',
            more_phone_numbers: '09022742888\n09188521583',
            slug: 'asdfhghjk'
          }}
        />
      );
    }
    render(<Component />);

    const inputs = await screen.findAllByTestId(PHONE_OVERLAY.input);

    expect(inputs[0]).toHaveValue('09187026684');
    expect(inputs[1]).toHaveValue('09022742888');
    expect(inputs[2]).toHaveValue('09188521583');
    expect(inputs.length).toBe(6);
  });

  test('Add Phone', async () => {
    function Component() {
      return (
        <SettingPhoneOverlay
          open
          onClose={noop}
          __test__={{
            id: 1,
            phone_zero_starts: '09187026684',
            more_phone_numbers: '09022742888',
            slug: 'asdfhghjk'
          }}
        />
      );
    }
    render(<Component />);
    //

    const addButtons = await screen.findAllByTestId(PHONE_OVERLAY.addButton);
    fireEvent.click(addButtons[0]);

    const inputs = await screen.findAllByTestId(PHONE_OVERLAY.input);
    fireEvent.change(inputs[2], { target: { value: '09188521583' } });

    expect(inputs[0]).toHaveValue('09187026684');
    expect(inputs[1]).toHaveValue('09022742888');
    expect(inputs[2]).toHaveValue('09188521583');
    expect(inputs.length).toBe(6);
  });

  test('Remove Phone', async () => {
    function Component() {
      return (
        <SettingPhoneOverlay
          open
          onClose={noop}
          __test__={{
            id: 1,
            phone_zero_starts: '09187026684',
            more_phone_numbers: '09022742888',
            slug: 'asdfhghjk'
          }}
        />
      );
    }
    render(<Component />);
    //

    const removeButtons = await screen.findAllByTestId(PHONE_OVERLAY.removeButton);
    fireEvent.click(removeButtons[1]);

    const inputs = await screen.findAllByTestId(PHONE_OVERLAY.input);

    expect(inputs[1]).not.toHaveValue('09022742888');
    expect(removeButtons[0]).toBeDisabled();
    expect(inputs.length).toBe(2);
  });
});
