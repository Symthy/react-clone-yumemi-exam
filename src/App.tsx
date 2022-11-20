import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { ApiClientProvider } from './api/ApiClientProvider';
import { AppHeader } from './components/layouts/app-header';
import { EnabledE2EContext } from './fixture/useEnabledE2EMode';
import { GlobalStyles } from './libs/global-style';
import { router } from './routes';

type AppProps = {
  isEnabledE2E: boolean;
};

export const App = ({ isEnabledE2E }: AppProps) => (
  <>
    <ApiClientProvider>
      <EnabledE2EContext.Provider value={isEnabledE2E}>
        <AppHeader />
        <RouterProvider router={router} />
        <Toaster />
      </EnabledE2EContext.Provider>
    </ApiClientProvider>
    <GlobalStyles />
  </>
);
