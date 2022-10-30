import { css } from '@emotion/react';
import { CheckBox } from 'src/components/elements/checkbox/index';
import { SelectableItem } from './types';

const styles = {
  container: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6.8rem, 6.8rem));

    > * {
      margin: ${0 / 16}rem ${0 / 16}rem ${0 / 16}rem ${16 / 16}rem;
    }
  `,
  noItem: css`
    margin-left: 0.5rem;
  `
};

type SelectionAreaProps = {
  selectableItems: SelectableItem[];
  updateSelectedPrefecture: (id: string, isSelected: boolean) => void;
};

export const SelectionArea = ({ selectableItems, updateSelectedPrefecture }: SelectionAreaProps) => (
  <div>
    {selectableItems.length === 0 ? (
      <p css={styles.noItem}>No Item</p>
    ) : (
      <div css={styles.container}>
        {selectableItems.map((item) => (
          <CheckBox id={item.id} key={item.id} label={item.label} onToggleSelectedState={updateSelectedPrefecture} />
        ))}
      </div>
    )}
  </div>
);
