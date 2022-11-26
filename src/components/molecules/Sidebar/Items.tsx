import { sidebarRoutes, tabNavigationRoutes } from '@constants/tabNavigationRoutes';
import { useLocation, useNavigate } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@components/atoms/ListItemIcon';
import ListItemText from '@components/atoms/ListItemText';
import { useTheme } from '@mui/material';

type SidebarItemsProps = {
  onClose: () => void;
};
const SidebarItems = ({ onClose }: SidebarItemsProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  return (
    <List>
      {[...tabNavigationRoutes, ...sidebarRoutes].map(({ icon, label, route }, index) => {
        const active = route === pathname;
        return (
          <ListItem
            id={'behtarino--admin--menuItem' + index}
            onClick={() => {
              onClose();
              navigate(route);
            }}
            key={index}
            disablePadding
            selected={active}
            sx={{
              borderRadius: 1,
              borderRight: active ? '4px solid ' + theme.palette.primary.main : undefined,
              mb: 2
            }}>
            <ListItemButton sx={{ py: 1 }}>
              <ListItemIcon active={active}>{icon}</ListItemIcon>
              <ListItemText primary={label} active={active} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
export default SidebarItems;
