/* eslint-disable react/jsx-props-no-spreading */
import { css, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

type InputTextFieldProps = {
  additionalStyles?: SerializedStyles;
};

export const InputTextField = styled.input(
  (props: InputTextFieldProps) => css`
    width: 16rem;
    border: none;
    border-radius: ${4 / 16}rem;
    box-shadow: 1px 1px 1px inset darkgray;
    outline: solid 1px gray;
    :focus {
      outline: solid 2px dodgerblue;
    }
    ${props.additionalStyles}
  `
);
