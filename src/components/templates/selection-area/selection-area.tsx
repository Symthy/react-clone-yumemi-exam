import { css } from '@emotion/react';
import { CheckBox } from 'src/components/elements/checkbox/index';
import { SelectableItem } from './types';

const styles = {
  container: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6rem, 6rem));

    > * {
      margin: ${4 / 16}rem ${8 / 16}rem;
    }
  `
};

type SelectionAreaProps = {
  title: string;
  selectableItems: SelectableItem[];
  updateSelectedPrefecture: (id: string, isSelected: boolean) => void;
};

export const SelectionArea = ({ title, selectableItems, updateSelectedPrefecture }: SelectionAreaProps) => (
  <div>
    <p>{title}</p>
    {selectableItems.length === 0 ? (
      <p>no item</p>
    ) : (
      <div css={styles.container}>
        {selectableItems.map((item) => (
          <CheckBox id={item.id} key={item.id} label={item.label} onToggleSelectedState={updateSelectedPrefecture} />
        ))}
      </div>
    )}
  </div>
);
