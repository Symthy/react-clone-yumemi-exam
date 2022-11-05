import { css, SerializedStyles } from '@emotion/react';
import { StyledProps } from './types';

export const cssMerger = (styles: SerializedStyles) => (props: StyledProps) =>
  css`
    ${styles}
    ${props.css}
  `;
