import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import { ResasApiClient } from './resasApiClient';
import { resasApiClientAtom } from './useResasApiClientStore';

type ApiClientProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
      staleTime: Infinity,
      useErrorBoundary: true
    }
  }
});

export const ApiClientProvider = ({ children }: ApiClientProviderProps) => (
  <QueryClientProvider client={queryClient}>
    <Provider initialValues={[[resasApiClientAtom, new ResasApiClient()]]}>{children}</Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
