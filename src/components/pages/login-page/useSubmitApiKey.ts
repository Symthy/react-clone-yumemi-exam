import { FormEvent } from 'react';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { resetQueryCache } from 'src/libs/react-query';
import { useRedirectAfterLogin } from 'src/routes/useRedirectAfterLogin';

export const useSubmitApiKey = (apiKey: string) => {
  const redirector = useRedirectAfterLogin();
  const { apiClient, setApiKey: setResasApiKey } = useResasApiClient();

  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (apiClient.initialized() && apiKey !== apiClient.resasApiKey) {
      resetQueryCache();
    }
    setResasApiKey(apiKey);
    redirector();
  };
};
