import { FormEvent } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { ApiClientError } from 'src/api/error';
import { ResasApiClient } from 'src/api/resasApiClient';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { resetQueryCache } from 'src/libs/react-query';
import { onCustomToaster } from 'src/libs/toast';
import { useRedirectAfterLogin } from 'src/routes/hooks/useRedirectAfterLogin';
import { validateApiKey } from './validator';

export const useSubmitApiKey = (apiKey: string) => {
  const redirector = useRedirectAfterLogin();
  const { apiClient, setApiKey: setResasApiKey } = useResasApiClient();
  const errHandler = useErrorHandler();
  const onSubmitApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (apiClient.initialized() && apiKey !== apiClient.resasApiKey) {
      resetQueryCache();
    }
    await validateApiKey(new ResasApiClient(apiKey))
      .then((isValid: boolean) => {
        if (isValid) {
          setResasApiKey(apiKey);
          redirector();
        }
      })
      .catch((err) => {
        if (err instanceof ApiClientError) {
          onCustomToaster(err);
          return;
        }
        errHandler(err);
      });
  };
  return { onSubmitApiKey };
};
