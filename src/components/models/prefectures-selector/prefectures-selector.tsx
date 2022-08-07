import { SelectionArea } from 'src/components/templates/selection-area/selection-area';
import { SelectableItem } from 'src/components/templates/selection-area/types';
import { Prefecture } from './types';

type PrefecturesSelectorProps = {
  prefectures: Prefecture[];
  updateSelectedState: (id: string, isSelected: boolean) => void;
};

export const PrefecturesSelector = ({ prefectures, updateSelectedState }: PrefecturesSelectorProps) => {
  const convertToSelectableItems = (prefs: Prefecture[]): SelectableItem[] =>
    prefs.map((pref) => ({
      id: String(pref.prefCode),
      label: pref.prefName
    }));

  return (
    <SelectionArea
      title='都道府県一覧'
      selectableItems={convertToSelectableItems(prefectures)}
      updateSelectedState={updateSelectedState}
    />
  );
};
