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
    data: prefecturesResponse,
    isLoading,
    isError,
    error
  }: UseQueryResult<PrefectureResponeseResult[], Error> = usePrefecturesQuery();

  const updateSelectedState = (id: string, isSelected: boolean): void => {
    const prefs = prefectures;
    const index = prefs.findIndex((pref) => String(pref.prefCode) === id);
    if (index < 0) {
      return;
    }
    prefs[index].isSelected = isSelected;
    setPrefectures(prefs);
  };

  useEffect(() => {
    if (prefecturesResponse) {
      const prefs = prefecturesResponse.map((pref) => ({ ...pref, isSelected: false }));
      setPrefectures(prefs);
    } else {
      setPrefectures([]);
    }
  }, [prefecturesResponse]);

  // Todo
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
