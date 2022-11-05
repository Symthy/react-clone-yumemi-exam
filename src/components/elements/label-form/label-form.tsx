import { FormEvent, ReactNode } from 'react';
import { css } from '@emotion/react';

const styles = {
  form: css`
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    padding: 1.5rem 2rem 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > :not(:last-child) {
      margin-bottom: 1rem;
    }

    position: relative;
  `,
  formLabel: css`
    font-size: ${16 / 16}rem;
    background-color: white;
    padding: 1px 3px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-50%) translateX(${12 / 16}rem);
  `
};

type LabelFormProps = {
  label: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> | void;
  children: ReactNode;
};

export const LabelForm = ({ label, children, ...props }: LabelFormProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <form css={styles.form} {...props}>
    <label css={styles.formLabel}>{label}</label>
    {children}
  </form>
);
