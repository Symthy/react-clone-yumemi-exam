import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import { queryClient } from 'src/libs/react-query';
import { ResasApiClient } from './resasApiClient';
import { resasApiClientAtom } from './useResasApiClient';

type ApiClientProviderProps = {
  children: ReactNode;
};

export const ApiClientProvider = ({ children }: ApiClientProviderProps) => (
  <QueryClientProvider client={queryClient}>
    <Provider initialValues={[[resasApiClientAtom, new ResasApiClient()]]}>{children}</Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
