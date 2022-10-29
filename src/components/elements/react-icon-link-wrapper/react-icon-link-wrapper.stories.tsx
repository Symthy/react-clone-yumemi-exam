import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { AiFillGithub } from 'react-icons/ai';
import { IconLinkWrapper } from './react-icon-link-wrapper';

export default { component: IconLinkWrapper } as ComponentMeta<typeof IconLinkWrapper>;

export const Default: ComponentStoryObj<typeof IconLinkWrapper> = {
  args: {
    url: 'https://twitter.com/SYM_souten',
    icon: <AiFillGithub size='2rem' color='black' title='Creater' />
  }
};
