import { useQuery } from '@tanstack/react-query';
import { ApiClientError } from 'src/api/error';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { PREFECTURES_QUERY_KEY } from 'src/consts';
import { errorBoundaryOption } from 'src/libs/react-query';
import { PrefectureResponeseResult } from 'src/types';

export const usePrefecturesQuery = () => {
  const { apiClient } = useResasApiClient();
  return useQuery<PrefectureResponeseResult[], Error | ApiClientError>(
    [PREFECTURES_QUERY_KEY],
    async () => apiClient.getPrefectures(),
    errorBoundaryOption
  );
};
