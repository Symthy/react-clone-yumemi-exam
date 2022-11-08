import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { AppHeader } from './app-header';

export default { component: AppHeader } as ComponentMeta<typeof AppHeader>;

export const Normal: ComponentStoryObj<typeof AppHeader> = {
  args: {}
};
