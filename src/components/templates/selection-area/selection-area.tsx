import { CheckBox } from 'src/components/elements/checkbox/index';
import { SelectableItem } from './types';

type SelectionAreaProps = {
  title: string;
  selectableItems: SelectableItem[];
  updateSelectedPrefecture: (id: string, isSelected: boolean) => void;
};

export const SelectionArea = ({
  title,
  selectableItems,
  updateSelectedPrefecture: updateSelectedState
}: SelectionAreaProps) => (
  <>
    <p>{title}</p>
    {selectableItems.length === 0 ? (
      <p>no item</p>
    ) : (
      <div>
        {selectableItems.map((item) => (
          <CheckBox id={item.id} key={item.id} label={item.label} onToggleSelectedState={updateSelectedState} />
        ))}
      </div>
    )}
  </>
);
