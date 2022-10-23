import { useEffect } from 'react';
import { PrefectureResponeseResult, Prefecture } from 'src/types';

export const useSavePrefectures = (
  prefecturesResponse: PrefectureResponeseResult[] | undefined,
  setPrefectures: (prefectures: Prefecture[]) => void
): void => {
  useEffect(() => {
    if (prefecturesResponse) {
      const prefs = prefecturesResponse.map((pref) => ({ ...pref, isSelected: false }));
      setPrefectures(prefs);
    } else {
      setPrefectures([]);
    }
  }, [prefecturesResponse, setPrefectures]);
};
