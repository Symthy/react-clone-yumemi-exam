import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from './consts';

export const useRedirectTop = () => {
  const navigate = useNavigate();
  const redirector = () => navigate(LOGIN_PATH, { replace: true });
  return redirector;
};

// ref: https://stackoverflow.com/questions/68694012/history-replace-in-react-router-dom-v6
