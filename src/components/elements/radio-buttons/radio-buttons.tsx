import { ChangeEvent } from 'react';
import { css } from '@emotion/react';

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: fit-content;
    border: 1px solid gray;
    border-radius: 0.5rem;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);

    > label {
      padding: 0.6rem 0.5rem;
      :first-child {
        padding-left: 1rem;
      }
      :last-child {
        padding-right: 1rem;
      }
    }
  `,
  radio: css`
    vertical-align: middle;
    margin-right: 0.4rem;
    margin-bottom: 0.1rem;
  `
};

type RadioButtonProps = {
  name: string;
  items: string[];
  checked: (item: string) => boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const RadioButtons = ({ name, items, checked, onChange }: RadioButtonProps) => (
  <div css={styles.container}>
    {items.map((item) => (
      <label>
        <input
          css={styles.radio}
          type='radio'
          id={item}
          value={item}
          name={name}
          checked={checked(item)}
          onChange={onChange}
        />
        {item}
      </label>
    ))}
  </div>
);
