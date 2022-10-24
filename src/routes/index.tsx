import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from 'src/components/pages/login-page/login-page';
import { PerPrefecturePopulationViewPage } from 'src/components/pages/prefecture-population-view-page/index';
import { LOGIN_PATH, PREFECTURE_POPULATION_VIEW } from './consts';
import { RequireApiKey } from './require-api-key';

const entranceRoute = (
  <RequireApiKey>
    <PerPrefecturePopulationViewPage />
  </RequireApiKey>
);

export const router = createBrowserRouter([
  { index: true, element: entranceRoute },
  { path: LOGIN_PATH, element: <LoginPage /> },
  { path: PREFECTURE_POPULATION_VIEW, element: entranceRoute }
]);
