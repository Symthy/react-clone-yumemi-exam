import { useQueries } from '@tanstack/react-query';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { POPULATION_QUERY_KEY } from 'src/consts';
import { errorBoundaryOption } from 'src/libs/react-query';
import { PopulationResponseResult, Prefecture } from 'src/types';
import { PrefectureToPopulationResponseResult } from './type';

export const usePopulationsQueries = (prefectures: Prefecture[]) => {
  const { apiClient } = useResasApiClient();

  const queries = prefectures.map((prefecture) => ({
    queryKey: [POPULATION_QUERY_KEY, prefecture.prefCode],
    queryFn: (): Promise<PrefectureToPopulationResponseResult> => {
      const responseResult: Promise<PopulationResponseResult> = apiClient.getPopulations(String(prefecture.prefCode));
      return responseResult.then((res) => ({
        prefName: prefecture.prefName,
        populations: res
      }));
    },
    ...errorBoundaryOption
  }));

  const queryResults = useQueries({ queries });
  const isLoading = queryResults.some((result) => result.isLoading);
  const prefectureToPopulationResponseResults = queryResults
    .map((result) => result.data)
    .filter((item): item is Exclude<typeof item, undefined> => item !== undefined);

  return { isLoading, prefectureToPopulationResponseResults };
};
