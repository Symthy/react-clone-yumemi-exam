import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { ApiClientProvider } from './api/ApiClientProvider';
import { AppHeader } from './components/layouts/app-header';
import { GlobalStyles } from './libs/global-style';
import { router } from './routes';

export const App = () => (
  <>
    <ApiClientProvider>
      <AppHeader />
      <RouterProvider router={router} />
      <Toaster />
    </ApiClientProvider>
    <GlobalStyles />
  </>
);
