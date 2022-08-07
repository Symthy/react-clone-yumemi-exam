import { useQuery } from '@tanstack/react-query';
import { PrefectureResponeseResult } from 'src/api/resasApiClient';
import { useResasApiClientStore } from 'src/api/useuseResasApiClientStore';

export const usePrefecturesQuery = () => {
  const { apiCilent } = useResasApiClientStore();
  return useQuery<PrefectureResponeseResult[], Error>(['prefectures'], () => apiCilent.getPrefectures());
};
