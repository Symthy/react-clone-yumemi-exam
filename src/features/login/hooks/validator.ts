import { ApiClientError } from 'src/api/error';
import { ResasApiClient } from 'src/api/resasApiClient';
import { onCustomToaster } from 'src/libs/toast';

export const validateApiKey = async (apiClient: ResasApiClient): Promise<boolean> => {
  const res = apiClient.getPrefectures();
  const isValid = res
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
