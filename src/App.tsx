import { QueryClient, QueryClientProvider } from 'react-query';
import { Slide, Theme, ToastContainer, ToastPosition } from 'react-toastify';

import AppRoutes from '@components/templates/AppRoutes';
import AppThemeProvider from '@contexts/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { ReactElement } from 'react';
import moment from 'moment-jalaali';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  }
});

const ToastProps = {
  rtl: true,
  position: 'top-right' as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored' as Theme
};

moment.loadPersian({ dialect: 'persian-modern' });

function App(props: { children?: ReactElement }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer transition={Slide} {...ToastProps} />

      <AppThemeProvider>
        <BrowserRouter>{props.children || <AppRoutes />}</BrowserRouter>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
