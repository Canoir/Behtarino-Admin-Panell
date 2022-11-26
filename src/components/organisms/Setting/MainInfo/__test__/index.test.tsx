import { SETTING } from '@constants/test';
import SettingMainInfo from '..';
import render from '@helpers/test';

describe('Setting Main Info', () => {
  test('Show Unapproved Edit Status', async () => {
    const { findByTestId } = render(<SettingMainInfo __test__={{ isUnApproved: true }} />);

    const selected = await findByTestId(SETTING.unApprovedStatus);
    expect(selected).toBeInTheDocument();
  });

  test('Hidden Unapproved Edit Status', async () => {
    const { queryByTestId } = render(<SettingMainInfo __test__={{ isUnApproved: false }} />);

    const selected = queryByTestId(SETTING.unApprovedStatus);
    expect(selected).not.toBeTruthy();
  });
});
