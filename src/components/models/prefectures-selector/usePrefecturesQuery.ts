import { useQuery } from '@tanstack/react-query';
import { PrefectureResponeseResult } from 'src/api/resasApiClient';
import { useResasApiClientStore } from 'src/api/useResasApiClientStore';

export const usePrefecturesQuery = () => {
  const [apiCilent] = useResasApiClientStore();
  return useQuery<PrefectureResponeseResult[], Error>(['prefectures'], () => apiCilent.getPrefectures());
};
