import { useCallback, useState } from 'react';
import { PrefecturePopulationGraphMemo as PrefecturePopulationGraph } from 'src/components/models/prefecture-population-graph/prefecture-population-graph';
import { PrefecturesSelector } from 'src/components/models/prefectures-selector/prefectures-selector';
import { Prefecture } from 'src/types';

export const PopulationPerPrefecturesPage = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  return (
    <>
      <PrefecturesSelector
        prefectures={prefectures}
        setPrefectures={useCallback((prefs: Prefecture[]) => setPrefectures(prefs), [])}
      />
      <PrefecturePopulationGraph prefectures={prefectures.filter((pref) => pref.isSelected)} />
    </>
  );
};
