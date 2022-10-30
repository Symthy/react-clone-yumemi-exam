import { BrowserRouter } from 'react-router-dom';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { AppHeader } from 'src/components/templates/app-header';
import { ErrorFallback } from './error-fallback';

export default { component: ErrorFallback } as ComponentMeta<typeof ErrorFallback>;

export const Default: ComponentStoryObj<typeof ErrorFallback> = {
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
