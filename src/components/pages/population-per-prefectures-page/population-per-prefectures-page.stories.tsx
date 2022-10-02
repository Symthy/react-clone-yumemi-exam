import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { ApiClientProvider } from 'src/api/ApiClientProvider';
import { PopulationPerPrefecturesPage } from './population-per-prefectures-page';

export default { component: PopulationPerPrefecturesPage } as ComponentMeta<typeof PopulationPerPrefecturesPage>;

export const Default: ComponentStoryObj<typeof PopulationPerPrefecturesPage> = {
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
