import { ChangeEvent } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { commonStyles } from 'src/styles';

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: fit-content;
    border: 0.5px solid ${commonStyles.themeColor};
    border-radius: 0.5rem;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);

    > label {
      padding: ${10 / 16}rem 0 ${10 / 16}rem ${16 / 16}rem;
      font-size: ${16 / 16}rem;
      @media screen and (max-width: 480px) {
        padding: ${10 / 16}rem 0 ${10 / 16}rem ${8 / 16}rem;
        font-size: ${14 / 16}rem;
      }
      :first-child {
        padding-left: ${12 / 16}rem;
        @media screen and (max-width: 480px) {
          padding-left: ${6 / 16}rem;
        }
      }
      :last-child {
        padding-right: ${12 / 16}rem;
        @media screen and (max-width: 480px) {
          padding-right: ${6 / 16}rem;
        }
      }
    }
  `,
  radio: css`
    vertical-align: middle;
    margin-right: ${2 / 16}rem;
    margin-bottom: ${3 / 16}rem;
  `
};

type RadioButtonProps = {
  name: string;
  items: string[];
  checked: (item: string) => boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  additionalStyles?: SerializedStyles;
};

export const RadioButtons = ({ name, items, checked, onChange, additionalStyles }: RadioButtonProps) => (
  <div css={[styles.container, additionalStyles]}>
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
