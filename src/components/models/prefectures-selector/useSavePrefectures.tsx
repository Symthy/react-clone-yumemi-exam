import { useEffect } from 'react';
import { PrefectureResponeseResult } from 'src/types';
import { Prefecture } from './types';

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
