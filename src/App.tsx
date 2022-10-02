import { RouterProvider } from 'react-router-dom';
import { AppHeader } from './components/templates/app-header';
import { router } from './routes';

export const App = () => (
  <>
    <AppHeader />
    <RouterProvider router={router} />
  </>
);
