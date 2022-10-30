import { DefaultOptions, QueryClient, UseQueryOptions } from '@tanstack/react-query';
import { ApiClientError } from 'src/api/error';
import { PREFECTURES_QUERY_KEY } from 'src/consts';
import { Promisable } from 'type-fest'; // eslint-disable-line import/no-extraneous-dependencies
import { onCustomToaster } from './toast';

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Promisable<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 24 * 60 * 60 * 1000, // 24h
    staleTime: 24 * 60 * 60 * 1000,
    useErrorBoundary: true
  }
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig
});

export const resetQueryCache = () => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  queryClient.resetQueries([PREFECTURES_QUERY_KEY]);
};

export const errorBoundaryOption = {
  // デフォルトはtrue? trueだとError Boundaryまで？throw Errorを通してしまうため抑止
  useErrorBoundary: (err: Error) => !(err instanceof ApiClientError),
  onError: (err: Error) => {
    if (err instanceof ApiClientError) {
      onCustomToaster(err);
    }
  }
};
