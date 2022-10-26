import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { CheckBox } from './checkbox';

export default { component: CheckBox } as ComponentMeta<typeof CheckBox>;

export const Default: ComponentStoryObj<typeof CheckBox> = {
  args: {
    id: '1',
    label: 'item'
  }
};

export const TwoByteCharacter: ComponentStoryObj<typeof CheckBox> = {
  args: {
    id: '1',
    label: 'アイテム'
  }
};
