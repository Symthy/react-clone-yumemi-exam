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
    height: '1rem';
    box-sizing: 'border-box';
    cursor: 'pointer';
    white-space: 'nowrap';
    text-align: 'center';
    border-radius: ${18 / 16}rem;

    display: 'inline-flex';
    justify-content: 'center';
    align-items: 'center';
    flex-wrap: nowrap;

    font-size: ${18 / 16}rem;
    padding: ${6 / 16}rem ${16 / 16}rem;
  `,
  label: css`
    //padding: 0 ${8 / 16}rem;
  `
};

export const Button = ({ label, onClick, prefix, suffix }: ButtonProps) => (
  <button css={styles.btn} type='button' onClick={onClick}>
    {prefix}
    <span css={styles.label}>{label}</span>
    {suffix}
  </button>
);
