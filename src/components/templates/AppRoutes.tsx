import { Else, If, Then } from 'react-if';
import { useEffect, useState } from 'react';

import BottomTabs from '@components/organisms/Layout/BottomTabs';
import Header from '@components/organisms/Layout/Header';
import Layout from '@components/templates/Layout';
import { Loader } from '@components/atoms/Loader';
import { Router } from './Router';
import Sidebar from '@components/organisms/Layout/Sidebar';
import { redirectLoginBaseUrl } from '@constants/config';
import { useLocation } from 'react-router-dom';
import useUser from '@hooks/api/useUser';

const routesWithoutLogin = ['/checkout'];
const AppRoutes = () => {
  const location = useLocation();
  const { info, isLoading, isAuthenticated } = useUser();

  const [isSecondaryPage, setSecondaryPage] = useState<boolean>(false);
  

  const needsLogin = !routesWithoutLogin.includes(location.pathname);

  const showLoading = needsLogin && (isLoading || !info);

  useEffect(() => {
    if (location) {
      isAuthenticated(location.pathname);
      setSecondaryPage(location.pathname.split('/').length > 2);
    }
  }, [location]);

  useEffect(() => {
    if (info === null && needsLogin) {
      window.location.href = `${redirectLoginBaseUrl}/login?returnURL=${encodeURIComponent(
        window.location.href
      )}`;
    }
  }, [info, needsLogin]);

  function header(toggleSidebar: () => void) {
    return <Header isSecondaryPage={isSecondaryPage} toggleSidebar={toggleSidebar} />;
  }

  function sidebar(isOpen: boolean, toggleSidebar: () => void) {
    return <Sidebar open={isOpen} toggleSidebar={toggleSidebar} />;
  }

  return (
    <If condition={showLoading}>
      <Then>
        <Loader />
      </Then>
      <Else>
        <Layout
          header={header}
          bottomTabs={isSecondaryPage ? null : <BottomTabs />}
          sidebar={sidebar}>
          <Router />
        </Layout>
      </Else>
    </If>
  );
};
export default AppRoutes;
