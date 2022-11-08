import { css, SerializedStyles } from '@emotion/react';
import { StyledProps } from './types';

export const cssMergerSupplier = (styles: SerializedStyles) => (props: StyledProps) =>
  css`
    ${styles}
    ${props.css}
  `;
