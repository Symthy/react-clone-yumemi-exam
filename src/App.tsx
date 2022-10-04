import { RouterProvider } from 'react-router-dom';
import { ApiClientProvider } from './api/ApiClientProvider';
import { AppHeader } from './components/templates/app-header';
import { router } from './routes';

export const App = () => (
  <ApiClientProvider>
    <AppHeader />
    <RouterProvider router={router} />
  </ApiClientProvider>
);
