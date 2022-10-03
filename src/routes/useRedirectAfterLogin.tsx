import { useNavigate } from 'react-router-dom';

export const useRedirectAfterLogin = () => {
  const navigate = useNavigate();
  const redirector = () => navigate('/population-view');
  return redirector;
};
