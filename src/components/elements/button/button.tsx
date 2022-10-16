import { ReactNode } from 'react';
import { css } from '@emotion/react';

type ButtonProps = {
  label: string;
  onClick: () => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

const styles = {
  btn: css`
    // height: 2rem;
    box-sizing: border-box;
    cursor: pointer;
    white-space: nowrap;
    text-align: center;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    //flex-direction: 'row';

    padding: ${2 / 16}rem ${16 / 16}rem;
    border-radius: ${18 / 16}rem;
    line-height: 200%;
  `,
  label: css`
    font-size: ${18 / 16}rem;
    padding: 0 ${8 / 16}rem;
  `
};

export const Button = ({ label, onClick, prefix, suffix }: ButtonProps) => (
  <button css={styles.btn} type='button' onClick={onClick}>
    {prefix}
    <span css={styles.label}>{label}</span>
    {suffix}
  </button>
);
