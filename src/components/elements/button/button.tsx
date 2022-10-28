import { ReactNode } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { themeColor } from 'src/styles';

type ButtonProps = {
  label: string;
  type?: 'submit' | 'reset' | 'button';
  prefix?: ReactNode;
  suffix?: ReactNode;
  additionalStyles?: SerializedStyles;
};

const styles = {
  btn: css`
    background-color: ${themeColor};
    box-sizing: border-box;
    cursor: pointer;
    white-space: nowrap;
    text-align: center;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    padding: ${2 / 16}rem ${16 / 16}rem;
    border-radius: ${18 / 16}rem;
    line-height: 200%;

    :hover {
      opacity: 0.7;
    }
  `,
  label: css`
    color: white;
    font-size: ${18 / 16}rem;
    padding: 0 ${8 / 16}rem;
  `
};

export const Button = ({ label, type = 'button', prefix, suffix, additionalStyles }: ButtonProps) => (
  // eslint-disable-next-line react/button-has-type
  <button css={[styles.btn, additionalStyles]} type={type}>
    {prefix}
    <span css={styles.label}>{label}</span>
    {suffix}
  </button>
);

// ref: https://github.com/jsx-eslint/eslint-plugin-react/issues/1555
