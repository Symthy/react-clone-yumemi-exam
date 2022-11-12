import { ResasApiClient } from 'src/api/resasApiClient';

export const validateApiKey = async (apiClient: ResasApiClient): Promise<boolean> => {
  const res = apiClient.getPrefectures();
  const isValid = res
    .then(() => true)
    .catch((err) => {
      throw err;
    });
  return isValid;
};
