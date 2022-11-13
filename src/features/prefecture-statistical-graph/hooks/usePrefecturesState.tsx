import { useCallback, useState } from 'react';
import { Prefecture, PrefectureResponeseResult } from 'src/types';

export const usePrefecturesState = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  const savePrefectures = useCallback((prefecturesResponse: PrefectureResponeseResult[] | undefined) => {
    if (prefecturesResponse) {
      const prefs = prefecturesResponse.map((pref) =>
        Object.hasOwn(pref, 'isSelected') ? (pref as Prefecture) : { ...pref, isSelected: false }
      );
      setPrefectures(prefs);
    } else {
      setPrefectures([]);
    }
  }, []);

  const updateSelectedPrefecture = useCallback(
    (id: string, isSelected: boolean): void => {
      const index = prefectures.findIndex((pref) => String(pref.prefCode) === id);
      if (index < 0) {
        return;
      }
      const prefs = [...prefectures];
      prefs[index].isSelected = isSelected;
      setPrefectures(prefs);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prefectures.map((perf) => perf.prefName).join()]
  );

  return { prefectures, savePrefectures, updateSelectedPrefecture };
};
