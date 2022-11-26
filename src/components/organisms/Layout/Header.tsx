import { ArrowBackOutlined, NotificationsNoneOutlined } from '@mui/icons-material';
import { Responsive, isDesktop as _isDesktop } from '@components/molecules/kit/Responsive';

import Badge from '@components/atoms/Badge';
import Box from '@mui/material/Box';
import { HEADER } from '@constants/test';
import IconButton from '@mui/material/IconButton';
import LogoFull from '@components/atoms/LogoFull';
import MenuIcon from '@mui/icons-material/Menu';
import { ROUTES } from '@constants/routes';
import { sidebarWidth } from '@components/organisms/Layout/Sidebar';
import useMailBox from '@hooks/api/useMailBox';
import { useNavigate } from 'react-router-dom';

type Props = {
  toggleSidebar: () => void;
  isSecondaryPage?: boolean;
  __test__?: { hasUnread: number };
};
export const HeaderHeight = 56;

const Header = ({ toggleSidebar, isSecondaryPage = false, __test__ }: Props) => {
  const isDesktop = _isDesktop();
  const { hasUnread } = __test__ || useMailBox() || {};

  const navigate = useNavigate();
  //
  return (
    <Box
      position="fixed"
      width={{ xs: '100%', md: sidebarWidth }}
      sx={{ zIndex: 1201, height: HeaderHeight }}
      display="flex"
      left="0"
      pl={6}
      pr={3}
      top={isDesktop ? '44px' : '0'}
      alignItems="center"
      justifyContent={isDesktop ? 'space-between' : 'center'}
      bgcolor="background.default">
      <Responsive.NotDesktop>
        <Box
          sx={{
            position: 'absolute',
            left: isSecondaryPage ? undefined : 24,
            right: isSecondaryPage ? 0 : undefined
          }}>
          <IconButton
            id="behtarino--admin--burgerMenu"
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={() => {
              if (isSecondaryPage) history.back();
              else toggleSidebar();
            }}
            sx={{ mr: 2, display: { md: 'none' } }}>
            {isSecondaryPage ? <ArrowBackOutlined /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Responsive.NotDesktop>

      <LogoFull />

      <Responsive.Desktop>
        <IconButton color="primary" onClick={() => navigate(ROUTES.MAILBOX)}>
          <Badge
            color="error"
            variant="dot"
            data-testId={HEADER.notificationDot}
            invisible={!hasUnread}>
            <NotificationsNoneOutlined data-testid={HEADER.notificationRing} />
          </Badge>
        </IconButton>
      </Responsive.Desktop>

      <Responsive.NotDesktop>
        <Box
          sx={{
            position: 'absolute',
            right: 16,
            display: !isSecondaryPage ? 'block' : 'none'
          }}>
          <IconButton color="primary" onClick={() => navigate(ROUTES.MAILBOX)}>
            <Badge
              color="error"
              variant="dot"
              data-testId={HEADER.notificationDot}
              invisible={!hasUnread}>
              <NotificationsNoneOutlined data-testid={HEADER.notificationRing} />
            </Badge>
          </IconButton>
        </Box>
      </Responsive.NotDesktop>
    </Box>
  );
};
export default Header;
