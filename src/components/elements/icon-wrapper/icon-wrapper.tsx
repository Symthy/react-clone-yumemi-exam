import { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/react';

type IconWrapperProps = {
  children: ReactNode;
  additionStyles?: SerializedStyles;
};

const styles = css`
  padding: ${2 / 16}rem;
`;

export const IconWrapper = ({ children, additionStyles }: IconWrapperProps) => (
  <span css={[styles, additionStyles]}>{children}</span>
);
