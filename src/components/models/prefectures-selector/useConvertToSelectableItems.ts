import { SelectableItem } from 'src/components/templates/selection-area/types';
import { Prefecture } from 'src/types';

export const useConvertToSelectableItems =
  () =>
  (prefs: Prefecture[]): SelectableItem[] =>
    prefs.map((pref) => ({
      id: String(pref.prefCode),
      label: pref.prefName
    }));
