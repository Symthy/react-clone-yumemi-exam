import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { CheckBox } from '.';

export default { component: CheckBox } as ComponentMeta<typeof CheckBox>;

export const Index: ComponentStoryObj<typeof CheckBox> = {
  args: {
    id: '1',
    label: 'item'
  }
};
