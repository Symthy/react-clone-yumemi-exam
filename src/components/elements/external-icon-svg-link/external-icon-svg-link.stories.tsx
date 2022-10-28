import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { ExternalIconLink } from './external-icon-svg-link';

export default { component: ExternalIconLink } as ComponentMeta<typeof ExternalIconLink>;

export const Normal: ComponentStoryObj<typeof ExternalIconLink> = {
  args: {
    svgFilePath: '../../../../public/iconmonstr-github-1.svg',
    url: 'https://github.com/Symthy',
    errorText: 'Git'
  }
};

export const Resize: ComponentStoryObj<typeof ExternalIconLink> = {
  args: {
    svgFilePath: '../../../../public/iconmonstr-github-1.svg',
    url: 'https://github.com/Symthy',
    size: 200,
    errorText: 'Git'
  }
};

export const Failed: ComponentStoryObj<typeof ExternalIconLink> = {
  args: {
    svgFilePath: '',
    url: 'https://github.com/Symthy',
    errorText: 'Git'
  }
};
