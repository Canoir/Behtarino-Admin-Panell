import { BadgeProps, Badge as _Badge } from '@mui/material';

type Props = BadgeProps;
function Badge(props: Props): JSX.Element {
  const { children, invisible, ...rest } = props;
  return invisible ? <>{children}</> : <_Badge {...rest}>{children}</_Badge>;
}

export default Badge;
