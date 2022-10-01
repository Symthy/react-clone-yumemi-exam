import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { ApiClientProvider } from 'src/api/ApiClientProvider';
import { PopulationPerPrefecturesView } from './population-per-prefectures-view';

export default { component: PopulationPerPrefecturesView } as ComponentMeta<typeof PopulationPerPrefecturesView>;

export const Default: ComponentStoryObj<typeof PopulationPerPrefecturesView> = {
  // parameters: {
  //   msw: {
  //     handlers: [mockPrefecturesApiHandler]
  //   }
  // },
  decorators: [
    (Story) => (
      <ApiClientProvider>
        <Story />
      </ApiClientProvider>
    )
  ]
};
