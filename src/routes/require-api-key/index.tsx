import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useResasApiClient } from 'src/api/useResasApiClient';

type Props = {
  children: ReactElement;
};

export const RequireApiKey = ({ children }: Props): ReactElement => {
  const { initialized } = useResasApiClient();
  return initialized ? children : <Navigate to='/login' />;
};
