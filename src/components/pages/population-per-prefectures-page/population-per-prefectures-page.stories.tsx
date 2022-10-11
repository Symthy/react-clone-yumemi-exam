import { Toaster } from 'react-hot-toast';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockPrefecturesForbiddenHandler } from 'src/mocks/handlers';
import { PopulationPerPrefecturesPage } from './population-per-prefectures-page';

export default { component: PopulationPerPrefecturesPage } as ComponentMeta<typeof PopulationPerPrefecturesPage>;

export const Default: ComponentStoryObj<typeof PopulationPerPrefecturesPage> = {
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

export const ClientError: ComponentStoryObj<typeof PopulationPerPrefecturesPage> = {
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
