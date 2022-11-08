import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from 'src/features/login';
import { PrefectureGraphPage } from 'src/features/prefecture- statistical-graph';
import { NotFoundPage } from 'src/routes/not-found/not-found';
import { LOGIN_PATH, PREFECTURE_POPULATION_VIEW_PATH } from './consts';
import { RequireApiKey } from './require-api-key';

const entranceRoute = (
  <RequireApiKey>
    <PrefectureGraphPage />
  </RequireApiKey>
);

export const router = createBrowserRouter(
  [
    { index: true, element: entranceRoute },
    { path: LOGIN_PATH, element: <LoginPage /> },
    { path: PREFECTURE_POPULATION_VIEW_PATH, element: entranceRoute },
    { path: '/*', element: <NotFoundPage /> }
  ],
  { basename: import.meta.env.BASE_URL } // Github Pages用
);
