import { useCallback, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { MultiLineChart } from 'src/components/elements/multi-line-chart';
import { RadioButtons, useRadioState } from 'src/components/elements/radio-buttons';
import { Prefecture } from 'src/types';
import { convertToMultiLineInput } from './converter';
import { PrefectureToPopulationDataSet } from './type';
import { usePopulationsQueries } from './usePopulationsQueries';
import { useSavePopulationDataset } from './useSavePopulationDataSet';

type PrefecturePopulationGraphProps = {
  prefectures: Prefecture[];
};

const styles = {
  container: css`
    display: flex;
    align-items: center;
    flex-direction: column;

    > * {
      margin: 0.5rem;
    }
  `
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

  const { selectedItem, checked, onChange } = useRadioState('総人口');
  const multiLineInputData = useMemo(
    () => convertToMultiLineInput(selectedItem, perfectureToPopulationDataSets),
    [selectedItem, perfectureToPopulationDataSets]
  );
  const statisticsItems = perfectureToPopulationDataSets.reduce<Set<string>>(
    (items, dataset) => new Set([...items, ...dataset.populations.labelToPopulations.keys()]),
    new Set()
  );

  if (isLoading && prefectures.length === 0) {
    // Todo
    return <div>Loading...</div>;
  }
  if (prefectures.length === 0) {
    // Todo
    return <div>No Data</div>;
  }
  return (
    <div css={styles.container}>
      <RadioButtons name='population' items={[...statisticsItems]} checked={checked} onChange={onChange} />
      <MultiLineChart input={multiLineInputData} />
    </div>
  );
};
