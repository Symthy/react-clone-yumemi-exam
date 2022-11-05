import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { LabelForm } from './label-form';

export default { component: LabelForm } as ComponentMeta<typeof LabelForm>;

export const Default: ComponentStoryObj<typeof LabelForm> = {
  args: {
    label: 'label',
    children: <div>test</div>
  }
};

export const Empty: ComponentStoryObj<typeof LabelForm> = {
  args: {
    label: 'label'
  }
};
