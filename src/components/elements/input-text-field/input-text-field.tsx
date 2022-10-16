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
  border: none;
  border-radius: ${4 / 16}rem;
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
    type='text'
    required={isRequired}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);
