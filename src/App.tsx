import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { css, Global } from '@emotion/react';
import sanitize from 'sanitize.css';
import typography from 'sanitize.css/typography.css';
import { ApiClientProvider } from './api/ApiClientProvider';
import { ErrorFallback } from './components/pages/error/error-fallback';
import { AppHeader } from './components/templates/app-header';
import { router } from './routes';

const styles = css`
  ${sanitize}
  ${typography} // ここにアプリ固有のベースになるスタイルを書く
`;

export const App = () => (
  <>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ApiClientProvider>
        <AppHeader />
        <RouterProvider router={router} />
        <Toaster />
      </ApiClientProvider>
    </ErrorBoundary>
    <Global styles={styles} />
  </>
);
