import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { css } from '@emotion/react';
import { ApiClientProvider } from './api/ApiClientProvider';
import { ErrorFallback } from './components/pages/error/error-fallback';
import { AppHeader } from './components/templates/app-header';
import { GlobalStyles } from './libs/global-style';
import { router } from './routes';

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const App = () => (
  <>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ApiClientProvider>
        <AppHeader />
        {/* <div css={styles}> */}
        <RouterProvider router={router} />
        {/* </div> */}
        <Toaster />
      </ApiClientProvider>
    </ErrorBoundary>
    <GlobalStyles />
  </>
);
