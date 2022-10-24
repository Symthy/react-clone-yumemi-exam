import { Prefecture } from 'src/types';

export const useUpdateSelectedPrefecture =
  (prefectures: Prefecture[], setPrefectures: (p: Prefecture[]) => void) =>
  (id: string, isSelected: boolean): void => {
    const index = prefectures.findIndex((pref) => String(pref.prefCode) === id);
    if (index < 0) {
      return;
    }
    const prefs = [...prefectures];
    prefs[index].isSelected = isSelected;
    setPrefectures(prefs);
  };
