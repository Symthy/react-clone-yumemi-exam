import { css } from '@emotion/react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { TfiReload } from 'react-icons/tfi';
import { IconWrapper } from './icon-wrapper';

export default { component: IconWrapper } as ComponentMeta<typeof IconWrapper>;

export const Default: ComponentStoryObj<typeof IconWrapper> = {
  args: {
    children: (
      <TfiReload
        css={css`
          margin-top: -1px;
        `}
      />
    ),
    additionStyles: css`
      background-color: red;
    `
  }
};
