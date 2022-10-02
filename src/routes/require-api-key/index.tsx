import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useResasApiClientStore } from 'src/api/useResasApiClientStore';

type Props = {
  children: ReactElement;
};

export const RequireApiKey = ({ children }: Props): ReactElement => {
  const [initialized] = useResasApiClientStore();
  return initialized ? children : <Navigate to='/login' />;
};
