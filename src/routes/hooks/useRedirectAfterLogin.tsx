import { useNavigate } from 'react-router-dom';
import { PREFECTURE_POPULATION_VIEW_PATH } from './consts';

export const useRedirectAfterLogin = () => {
  const navigate = useNavigate();
  const redirector = () => navigate(PREFECTURE_POPULATION_VIEW_PATH);
  return redirector;
};
