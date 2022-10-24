import { useCallback, useMemo, useState } from 'react';
import { MultiLineChart } from 'src/components/elements/multi-line-chart';
import { Prefecture } from 'src/types';
import { convertToMultiLineInput } from './converter';
import { PrefectureToPopulationDataSet } from './type';
import { usePopulationsQueries } from './usePopulationsQueries';
import { useSavePopulationDataset } from './useSavePopulationDataSet';

type PrefecturePopulationGraphProps = {
  prefectures: Prefecture[];
};

export const PrefecturePopulationGraph = ({ prefectures }: PrefecturePopulationGraphProps) => {
  const [perfectureToPopulationDataSets, setPrefectureToPopulationDataSets] = useState<PrefectureToPopulationDataSet[]>(
    []
  );
  const { isLoading, prefectureToPopulationResponseResults } = usePopulationsQueries(prefectures);

  useSavePopulationDataset(
    prefectureToPopulationResponseResults,
    useCallback((datasets: PrefectureToPopulationDataSet[]) => setPrefectureToPopulationDataSets(datasets), [])
  );

  const selectedLabel = '総人口'; // Todo
  const inputData = useMemo(
    () => convertToMultiLineInput(selectedLabel, perfectureToPopulationDataSets),
    [selectedLabel, perfectureToPopulationDataSets]
  );

  if (isLoading && prefectures.length === 0) {
    // Todo
    return <div>Loading...</div>;
  }
  if (prefectures.length === 0) {
    // Todo
    return <div>No Data</div>;
  }
  return <MultiLineChart input={inputData} />;
};
