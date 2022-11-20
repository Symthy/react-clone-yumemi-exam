import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
import { LoginPage } from 'src/features/login';
import { PrefectureGraphPage } from 'src/features/prefecture-statistical-graph';
import { ErrorPage } from './components/error';
import { NotFoundPage } from './components/not-found';
import { RequireApiKey } from './components/require-api-key';
import { LOGIN_PATH, PREFECTURE_POPULATION_VIEW_PATH } from './consts';

const entranceRoute = (
  <RequireApiKey>
    <PrefectureGraphPage />
  </RequireApiKey>
);

const ErrorBoundaryLayout = () => {
  const location = useLocation();
  return (
    <ErrorBoundary key={location.pathname} FallbackComponent={ErrorPage}>
      <Outlet />
    </ErrorBoundary>
  );
};

export const router = createBrowserRouter(
  [
    {
      element: <ErrorBoundaryLayout />,
      children: [
        { index: true, element: entranceRoute },
        { path: LOGIN_PATH, element: <LoginPage /> },
        { path: PREFECTURE_POPULATION_VIEW_PATH, element: entranceRoute },
        { path: '/*', element: <NotFoundPage /> }
      ]
    }
  ],
  { basename: import.meta.env.BASE_URL } // Github Pages用
);

// ref: https://stackoverflow.com/questions/74019392/using-react-error-boundary-with-react-router?rq=1
