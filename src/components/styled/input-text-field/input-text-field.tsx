/* eslint-disable react/jsx-props-no-spreading */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StyledProps } from 'src/components/styled/types';

export const StyledInputTextField = styled.input(
  (props: StyledProps) => css`
    width: 16rem;
    border: none;
    border-radius: ${4 / 16}rem;
    box-shadow: 1px 1px 1px inset darkgray;
    outline: solid 1px gray;
    :focus {
      outline: solid 2px dodgerblue;
    }
    ${props.css}
  `
);
