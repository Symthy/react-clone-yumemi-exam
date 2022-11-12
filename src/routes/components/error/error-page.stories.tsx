import { BrowserRouter } from 'react-router-dom';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { AppHeader } from 'src/components/layouts/app-header';
import { ErrorPage } from './error-page';

export default { component: ErrorPage } as ComponentMeta<typeof ErrorPage>;

export const Default: ComponentStoryObj<typeof ErrorPage> = {
  args: {
    error: new Error('test error')
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <AppHeader />
        <Story />
      </BrowserRouter>
    )
  ]
};
