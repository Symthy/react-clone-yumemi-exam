import { BrowserRouter } from 'react-router-dom';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { ApiClientProvider } from 'src/api/ApiClientProvider';
import { AppHeader } from 'src/components/layouts/app-header';
import { LoginPage } from './login-page';

export default { component: LoginPage } as ComponentMeta<typeof LoginPage>;

export const Default: ComponentStoryObj<typeof LoginPage> = {
  decorators: [
    (Story) => (
      <ApiClientProvider>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </ApiClientProvider>
    )
  ]
};
// react-router を使用する際は、decoraters に設定が必要
// ref: https://qiita.com/akasatana12345/items/f6cea50fe99d0fa2b637

export const Full: ComponentStoryObj<typeof LoginPage> = {
  decorators: [
    (Story) => (
      <ApiClientProvider>
        <BrowserRouter>
          <AppHeader />
          <Story />
        </BrowserRouter>
      </ApiClientProvider>
    )
  ]
};
