import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { TitleBodyLayout } from './title-body-layout';

export default { component: TitleBodyLayout } as ComponentMeta<typeof TitleBodyLayout>;

export const NoBorder: ComponentStoryObj<typeof TitleBodyLayout> = {
  args: {
    title: 'title',
    children: 'children',
    existsBorder: false
  }
};

export const ExistsBorder: ComponentStoryObj<typeof TitleBodyLayout> = {
  args: {
    title: 'title',
    children: 'children',
    existsBorder: true
  }
};
