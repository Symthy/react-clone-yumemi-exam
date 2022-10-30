import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Loading } from './loading';

export default { component: Loading } as ComponentMeta<typeof Loading>;

export const Normal: ComponentStoryObj<typeof Loading> = {
  args: {}
};
