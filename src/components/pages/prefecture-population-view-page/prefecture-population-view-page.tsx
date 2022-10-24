import { useState } from 'react';
import { PrefecturePopulationGraph } from 'src/components/models/prefecture-population-graph/prefecture-population-graph';
import { PrefecturesSelector } from 'src/components/models/prefectures-selector/prefectures-selector';
import { Prefecture } from 'src/types';

export const PerPrefecturePopulationViewPage = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  return (
    <>
      <PrefecturesSelector prefectures={prefectures} setPrefectures={setPrefectures} />
      <PrefecturePopulationGraph prefectures={prefectures.filter((pref) => pref.isSelected)} />
    </>
  );
};
