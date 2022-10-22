import { useCallback, useState } from 'react';
import { PopulationGraph } from 'src/components/models/population-graph/population-graph';
import { PrefecturesSelector } from 'src/components/models/prefectures-selector/prefectures-selector';
import { Prefecture } from 'src/components/models/prefectures-selector/types';

export const PopulationPerPrefecturesPage = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  return (
    <>
      <PrefecturesSelector
        prefectures={prefectures}
        setPrefectures={useCallback((prefs: Prefecture[]) => setPrefectures(prefs), [])}
      />
      <PopulationGraph />
    </>
  );
};
