import { useLocation, useNavigate } from 'react-router-dom';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { tabNavigationRoutes } from '@constants/tabNavigationRoutes';

export const bottomTabsHeight = 56;

const BottomTabs = (): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <BottomNavigation
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: { xs: 'flex', md: 'none' },
        boxShadow: 2
      }}
      showLabels
      value={pathname}
      onChange={(event, newValue) => {
        navigate(newValue);
      }}
      color="secondary">
      {tabNavigationRoutes.map(({ label, icon, route }, index) => (
        <BottomNavigationAction
          id={'behtarino--admin--bottomNav' + index}
          key={index}
          label={label}
          value={route}
          icon={icon}
        />
      ))}
    </BottomNavigation>
  );
};
export default BottomTabs;
