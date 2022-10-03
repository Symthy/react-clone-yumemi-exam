import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockPrefecturesApiHandler } from 'src/mocks/handlers';
import { PopulationPerPrefecturesPage } from './population-per-prefectures-page';

export default { component: PopulationPerPrefecturesPage } as ComponentMeta<typeof PopulationPerPrefecturesPage>;

const queryClient = new QueryClient();

export const Default: ComponentStoryObj<typeof PopulationPerPrefecturesPage> = {
  parameters: {
    msw: {
      handlers: [mockPrefecturesApiHandler]
    }
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    )
  ]
};
