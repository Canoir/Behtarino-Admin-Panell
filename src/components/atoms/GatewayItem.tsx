import { Button, useTheme } from '@mui/material';

import { cdnBaseURL } from '@constants/config';

type Props = {
  iconName: string;
  ownKey: string;
  selectedKey: string;
  onClick: (key: string) => void;
};
export function GatewayItem(props: Props) {
  const { iconName, ownKey, selectedKey, onClick } = props;
  const theme = useTheme();

  return (
    <Button
      onClick={() => onClick(ownKey)}
      sx={{
        border:
          '1px solid ' +
          (ownKey === selectedKey ? theme?.palette.primary.main : theme?.palette.grey[400]),
        m: 2,
        width: '72px',
        height: '72px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <img src={`${cdnBaseURL}/${iconName}`} />
    </Button>
  );
}
