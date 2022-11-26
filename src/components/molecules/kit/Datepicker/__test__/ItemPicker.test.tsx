import render, { screen } from '@helpers/test';

import { DATE_PICKER } from '@constants/test';
import ItemPicker from '../ItemPicker';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';

describe('Item Picker', () => {
  test('Center Label in Items', async () => {
    function Component() {
      const [value, setValue] = useState(4);
      return (
        <ItemPicker items={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11]} onChange={setValue} value={value} />
      );
    }

    const { findByTestId, unmount } = render(<Component />);

    const selected = await findByTestId(DATE_PICKER.selected);

    expect(selected).toBeInTheDocument();
    expect(selected).toHaveTextContent('4');

    unmount();
  });

  describe('Buttons', () => {
    beforeEach(() => {
      function Component() {
        const [value, setValue] = useState(4);
        return (
          <ItemPicker items={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11]} onChange={setValue} value={value} />
        );
      }

      render(<Component />);
    });

    it('Up Button', async () => {
      const user = userEvent.setup();

      await user.click(await screen.findByTestId(DATE_PICKER.upButton));

      setTimeout(async () => {
        expect(await screen.findByTestId(DATE_PICKER.selected)).toBeInTheDocument();
        expect(await screen.findByTestId(DATE_PICKER.selected)).toHaveTextContent('3');
        // This is a partial shit based code! which means that there was no other way to click down and update state!
        await user.click(await screen.findByTestId(DATE_PICKER.downButton));
      }, 0);
    });

    it('Down Button', async () => {
      setTimeout(async () => {
        expect(await screen.findByTestId(DATE_PICKER.selected)).toBeInTheDocument();
        expect(await screen.findByTestId(DATE_PICKER.selected)).toHaveTextContent('4');
      }, 0);
    });
  });
});
