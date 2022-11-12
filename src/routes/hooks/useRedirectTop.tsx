import { useNavigate } from 'react-router-dom';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { ROOT_PATH } from '../consts';

export const useRedirectTop = () => {
  const { resetApiKey } = useResasApiClient();
  const navigate = useNavigate();
  const redirector = () => {
    resetApiKey();
    navigate(ROOT_PATH, { replace: true });
  };
  return redirector;
};

// ref: https://stackoverflow.com/questions/68694012/history-replace-in-react-router-dom-v6
