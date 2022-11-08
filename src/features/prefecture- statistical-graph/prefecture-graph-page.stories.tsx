import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockPrefecturesForbiddenHandler, mockPrefecturesServerErrorHandler } from 'src/mocks/handlers';
import { ErrorFallback } from '../error';
import { PrefectureGraphPage } from './prefecture-graph-page';

export default { component: PrefectureGraphPage } as ComponentMeta<typeof PrefectureGraphPage>;

export const Default: ComponentStoryObj<typeof PrefectureGraphPage> = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    }
  ]
};

export const ClientError: ComponentStoryObj<typeof PrefectureGraphPage> = {
  parameters: {
    msw: {
      handlers: { prefectures: mockPrefecturesForbiddenHandler } // overwrite
    }
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
          <Toaster />
        </QueryClientProvider>
      );
    }
  ]
};

export const ServerError: ComponentStoryObj<typeof PrefectureGraphPage> = {
  parameters: {
    msw: {
      handlers: { prefectures: mockPrefecturesServerErrorHandler } // overwrite
    }
  },
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <QueryClientProvider client={queryClient}>
              <Story />
            </QueryClientProvider>
          </ErrorBoundary>
        </BrowserRouter>
      );
    }
  ]
};
