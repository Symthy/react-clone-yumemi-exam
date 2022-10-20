import { useQuery } from '@tanstack/react-query';
import { ApiClientError } from 'src/api/error';
import { useResasApiClient } from 'src/api/useResasApiClient';
import { POPULATION_QUERY_KEY } from 'src/consts';
import { errorBoundaryOption } from 'src/libs/react-query';
import { PopulationsResponseResult } from 'src/types';

export const usePopulationsQuery = (prefCode: string, cityCode?: string) => {
  const { apiClient } = useResasApiClient();
  return useQuery<PopulationsResponseResult[], Error | ApiClientError>(
    [POPULATION_QUERY_KEY],
    async () => apiClient.getPopulations(prefCode, cityCode),
    errorBoundaryOption
  );
};
