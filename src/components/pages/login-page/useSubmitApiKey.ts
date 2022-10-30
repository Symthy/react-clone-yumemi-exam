import { FormEvent } from 'react';
import { ApiClientError } from 'src/api/error';
import { ResasApiClient } from 'src/api/resasApiClient';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { resetQueryCache } from 'src/libs/react-query';
import { onCustomToaster } from 'src/libs/toast';
import { useRedirectAfterLogin } from 'src/routes/useRedirectAfterLogin';

const validateApiKey = async (apiClient: ResasApiClient): Promise<boolean> => {
  const res = apiClient.getPrefectures();
  const isValid = await res
    .then(() => true)
    .catch((err) => {
      if (err instanceof ApiClientError) {
        onCustomToaster(err);
        return false;
      }
      throw err;
    });
  return isValid;
};

export const useSubmitApiKey = (apiKey: string) => {
  const redirector = useRedirectAfterLogin();
  const { apiClient, setApiKey: setResasApiKey } = useResasApiClient();

  return async (e: FormEvent<HTMLFormElement>) => {
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
};
