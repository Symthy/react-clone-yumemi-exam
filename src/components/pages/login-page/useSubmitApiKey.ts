import { FormEvent } from 'react';
import { ResasApiClient } from 'src/api/resasApiClient';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { resetQueryCache } from 'src/libs/react-query';
import { useRedirectAfterLogin } from 'src/routes/useRedirectAfterLogin';
import { validateApiKey } from './validater';

export const useSubmitApiKey = (apiKey: string) => {
  const redirector = useRedirectAfterLogin();
  const { apiClient, setApiKey: setResasApiKey } = useResasApiClient();

  const onSubmitApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (apiClient.initialized() && apiKey !== apiClient.resasApiKey) {
      resetQueryCache();
    }
    await validateApiKey(new ResasApiClient(apiKey)).then((isValid: boolean) => {
      if (isValid) {
        setResasApiKey(apiKey);
        redirector();
      }
    });
  };
  return { onSubmitApiKey };
};
