import { CheckBox } from 'src/components/elements/checkbox';
import { SelectableItem, SelectableItems } from './types';

type SelectionAreaProps = {
  selectableItems: SelectableItems;
  updateSelectedState: (id: string, isSelected: boolean) => void;
};

export const SelectionArea = <T extends SelectableItems>({
  selectableItems,
  updateSelectedState
}: SelectionAreaProps) => {
  if (selectableItems.isEmpty) {
    return <p>no item</p>;
  }

  return (
    <div>
      {selectableItems.all.map((item) => {
        return <CheckBox id={item.id} label={item.label} onToggleSelectedState={updateSelectedState} />;
      })}
    </div>
  );
};
