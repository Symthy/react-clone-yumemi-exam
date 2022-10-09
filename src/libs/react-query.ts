import { DefaultOptions, QueryClient, UseQueryOptions } from '@tanstack/react-query';
import { PREFECTURES_QUERY_KEY } from 'src/consts';
import { Promisable } from 'type-fest'; // eslint-disable-line import/no-extraneous-dependencies

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Promisable<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: Infinity,
    staleTime: Infinity,
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
