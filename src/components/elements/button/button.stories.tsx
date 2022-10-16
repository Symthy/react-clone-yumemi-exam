import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { BiLogIn } from 'react-icons/bi';
import { TfiReload } from 'react-icons/tfi';
import { Button } from './button';

export default { component: Button } as ComponentMeta<typeof Button>;

export const Default: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'Button'
  }
};

export const SpecifiedPrefix: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'Specifed Prefix Button',
    prefix: <TfiReload />
  }
};

export const SpecifiedSuffix: ComponentStoryObj<typeof Button> = {
  args: {
    label: 'Specified Suffix Button',
    suffix: <BiLogIn size={`${22 / 16}rem`} />
  }
};
