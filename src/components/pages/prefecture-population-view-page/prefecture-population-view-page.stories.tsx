import { Toaster } from 'react-hot-toast';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockPrefecturesForbiddenHandler } from 'src/mocks/handlers';
import { PopulationPerPrefecturesPage as PrefecturePopulationViewPage } from './prefecture-population-view-page';

export default { component: PrefecturePopulationViewPage } as ComponentMeta<typeof PrefecturePopulationViewPage>;

export const Default: ComponentStoryObj<typeof PrefecturePopulationViewPage> = {
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

export const ClientError: ComponentStoryObj<typeof PrefecturePopulationViewPage> = {
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
