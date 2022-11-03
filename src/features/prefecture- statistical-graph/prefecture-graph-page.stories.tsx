import { Toaster } from 'react-hot-toast';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockPrefecturesForbiddenHandler } from 'src/mocks/handlers';
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
