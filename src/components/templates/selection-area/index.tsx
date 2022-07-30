import { CheckBox } from 'src/components/elements/checkbox';
import { SelectableItem, SelectableItems } from './types';

type SelectionAreaProps = {
  title: string;
  selectableItems: SelectableItems;
  updateSelectedState: (id: string, isSelected: boolean) => void;
};

export const SelectionArea = <T extends SelectableItems>({
  title,
  selectableItems,
  updateSelectedState
}: SelectionAreaProps) => {
  return (
    <>
      <p>{title}</p>
      {selectableItems.isEmpty ? (
        <p>no item</p>
      ) : (
        <div>
          {selectableItems.all.map((item) => {
            return <CheckBox id={item.id} label={item.label} onToggleSelectedState={updateSelectedState} />;
          })}
        </div>
      )}
    </>
  );
};
