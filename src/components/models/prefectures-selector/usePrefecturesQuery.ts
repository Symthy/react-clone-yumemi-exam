import { useQuery } from '@tanstack/react-query';
import { PrefectureResponeseResult } from 'src/api/resasApiClient';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { PREFECTURES_QUERY_KEY } from 'src/consts';

export const usePrefecturesQuery = () => {
  const { apiClient } = useResasApiClient();
  return useQuery<PrefectureResponeseResult[], Error>([PREFECTURES_QUERY_KEY], () => apiClient.getPrefectures());
};
