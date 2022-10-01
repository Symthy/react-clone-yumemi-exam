import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { ExternalTextLink } from './external-text-link';

export default { component: ExternalTextLink } as ComponentMeta<typeof ExternalTextLink>;

export const Normal: ComponentStoryObj<typeof ExternalTextLink> = {
  args: {
    label: 'Github',
    url: 'https://github.com/Symthy'
  }
};

export const Resize: ComponentStoryObj<typeof ExternalTextLink> = {
  args: {
    label: 'Github',
    url: 'https://github.com/Symthy',
    fontSize: 10
  }
};
