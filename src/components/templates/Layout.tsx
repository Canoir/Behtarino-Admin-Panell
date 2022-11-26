import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { HeaderHeight } from '@components/organisms/Layout/Header';
import { bottomTabsHeight } from '@components/organisms/Layout/BottomTabs';
import { sidebarWidth } from '@components/organisms/Layout/Sidebar';
import useToggle from '@hooks/useToggle';

type Props = {
  header: (toggleSidebar: () => void) => React.ReactNode;
  bottomTabs: React.ReactNode | null;
  children: React.ReactNode;
  sidebar: (show: boolean, toggleSidebar: () => void) => React.ReactNode;
};
const Layout = ({ header, bottomTabs, children, sidebar }: Props): JSX.Element => {
  const [sidebarOpen, toggleSidebar] = useToggle();
  //
  return (
    <Box display="flex" flexDirection="column" height="100%">
      {header(toggleSidebar)}
      {sidebar(sidebarOpen, toggleSidebar)}
      <Box
        pl={{ md: `${sidebarWidth}px` }}
        pt={{ xs: `${HeaderHeight}px`, md: 0 }}
        pb={{ xs: `${bottomTabs ? bottomTabsHeight : 0}px`, md: 0 }}
        flex="1"
        display="flex">
        <Box bgcolor="bg.dark" py={3} flex="1">
          <Container maxWidth={false} sx={{ maxWidth: '930px' }}>
            {children}
          </Container>
        </Box>
      </Box>
      {bottomTabs}
    </Box>
  );
};
export default Layout;
