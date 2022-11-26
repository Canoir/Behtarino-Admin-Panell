import { ListItem, ListItemButton } from '@mui/material';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { HeaderHeight } from '@components/organisms/Layout/Header';
import ListItemIcon from '@components/atoms/ListItemIcon';
import ListItemText from '@components/atoms/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import SidebarAccountManager from '@components/molecules/Sidebar/BusinessSelector';
import SidebarItems from '@components/molecules/Sidebar/Items';
import { TOKEN_COOKIE_KEY } from '@constants/cookies';
import { isDesktop } from '@components/molecules/kit/Responsive';
import { removeCookie } from 'typescript-cookie';
import { useLocation } from 'react-router-dom';
import useUser from '@hooks/api/useUser';

export const sidebarWidth = 300;

type Props = {
  open: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ open, toggleSidebar }: Props) => {
  const _isDesktop = isDesktop();
  const spaceFromLogo = _isDesktop ? 64 : 0;
  const { isAuthenticated: refetchUser } = useUser();

  const location = useLocation();

  return (
    <Drawer
      open={_isDesktop ? true : open}
      variant={_isDesktop ? 'permanent' : 'temporary'}
      onClose={() => {
        toggleSidebar();
      }}>
      <Box p={3} pt={`${HeaderHeight + spaceFromLogo}px`} width={sidebarWidth} flex="1">
        <SidebarAccountManager />
        <SidebarItems onClose={toggleSidebar} />
      </Box>

      <Box p={3} mb={8} width="100%" borderRadius={2}>
        <ListItem
          onClick={() => {
            toggleSidebar();
            removeCookie(TOKEN_COOKIE_KEY, { domain: 'behtarino.com' });
            localStorage.removeItem('selectedBusiness');
            refetchUser(location.pathname);
          }}
          key={'exit'}
          disablePadding
          sx={{
            borderRadius: 1
          }}>
          <ListItemButton sx={{ py: 1 }}>
            <ListItemIcon active={false}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'خروج'} active={false} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};
export default Sidebar;
