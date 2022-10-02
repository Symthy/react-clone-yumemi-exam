import { useEffect, useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { PrefectureResponeseResult } from 'src/api/resasApiClient';
import { PopulationGraph } from 'src/components/models/population-graph/population-graph';
import { PrefecturesSelector } from 'src/components/models/prefectures-selector/prefectures-selector';
import { Prefecture } from 'src/components/models/prefectures-selector/types';
import { usePrefecturesQuery } from 'src/components/models/prefectures-selector/usePrefecturesQuery';

export const PopulationPerPrefecturesPage = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  const {
    data: prefResults,
    isLoading,
    isError
  }: UseQueryResult<PrefectureResponeseResult[], Error> = usePrefecturesQuery();

  const updateSelectedState = (id: string, isSelected: boolean): void => {
    const prefs = prefectures;
    const index = prefs.findIndex((pref) => String(pref.prefCode) === id);
    if (index === -1) {
      return;
    }
    prefs[index].isSelected = isSelected;
    setPrefectures(prefs);
  };

  useEffect(() => {
    if (prefResults) {
      const prefs = prefResults.map((pref) => ({ ...pref, isSelected: false }));
      setPrefectures(prefs);
    } else {
      setPrefectures([]);
    }
  }, [prefResults]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PrefecturesSelector prefectures={prefectures} updateSelectedState={updateSelectedState} />
      <PopulationGraph />
    </>
  );
};
