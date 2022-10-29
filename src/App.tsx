import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { ApiClientProvider } from './api/ApiClientProvider';
import { ErrorFallback } from './components/pages/error/error-fallback';
import { AppHeader } from './components/templates/app-header';
import { GlobalStyles } from './libs/global-style';
import { router } from './routes';

export const App = () => (
  <>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ApiClientProvider>
        <AppHeader />
        <RouterProvider router={router} />
        <Toaster />
      </ApiClientProvider>
    </ErrorBoundary>
    <GlobalStyles />
  </>
);
