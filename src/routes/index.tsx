import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from 'src/components/pages/login-page/login-page';
import { PopulationPerPrefecturesPage } from 'src/components/pages/prefecture-population-view-page/index';
import { RequireApiKey } from './require-api-key';

const entranceRoute = (
  <RequireApiKey>
    <PopulationPerPrefecturesPage />
  </RequireApiKey>
);

export const router = createBrowserRouter([
  { index: true, element: entranceRoute },
  { path: '/login', element: <LoginPage /> },
  { path: '/prefecture-population-view', element: entranceRoute }
]);
