import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { InputTextField } from './input-text-field';

export default { component: InputTextField } as ComponentMeta<typeof InputTextField>;

export const Default: ComponentStoryObj<typeof InputTextField> = {
  args: {
    value: '',
    placeholder: 'placeholder'
  }
};
