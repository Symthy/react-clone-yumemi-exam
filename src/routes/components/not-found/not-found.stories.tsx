import { BrowserRouter } from 'react-router-dom';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { AppHeader } from 'src/components/layouts/app-header';
import { NotFoundPage } from './not-found';

export default { component: NotFoundPage } as ComponentMeta<typeof NotFoundPage>;

export const Default: ComponentStoryObj<typeof NotFoundPage> = {
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AppHeader />
        <Story />
      </BrowserRouter>
    )
  ]
};
