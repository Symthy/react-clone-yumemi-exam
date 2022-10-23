import { Prefecture } from 'src/types';

export const useUpdateSelectedPrefecture =
  (prefectures: Prefecture[], setPrefectures: (prefs: Prefecture[]) => void) =>
  (id: string, isSelected: boolean): void => {
    const index = prefectures.findIndex((pref) => String(pref.prefCode) === id);
    if (index < 0) {
      return;
    }
    prefectures[index].isSelected = isSelected;
    setPrefectures(prefectures);
  };
