/* eslint-disable react/jsx-props-no-spreading */
import { ChangeEvent } from 'react';
import { css, SerializedStyles } from '@emotion/react';

type InputTextFieldProps = {
  value: string;
  placeholder?: string;
  isRequired?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  additionalStyles?: SerializedStyles;
};

const styles = css`
  width: 15rem;
  border: none;
  border-radius: ${4 / 16}rem;
  box-shadow: 1px 1px 1px inset darkgray;
  outline: solid 1px gray;
  :focus {
    outline: solid 2px dodgerblue;
    // Todo: use ref
  }
`;

export const InputTextField = ({
  value,
  placeholder,
  isRequired = true,
  onChange,
  additionalStyles
}: InputTextFieldProps) => (
  <input
    css={[styles, additionalStyles]}
    type='password'
    required={isRequired}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);
