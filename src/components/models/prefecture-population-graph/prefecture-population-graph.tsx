/* eslint-disable no-nested-ternary */
import { useCallback, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { MultiLineChart } from 'src/components/elements/multi-line-chart';
import { RadioButtons, useRadioState } from 'src/components/elements/radio-buttons';
import { TitleBodyLayout } from 'src/components/elements/title-body-layout';
import { Loading } from 'src/components/templates/loading';
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
  `,
  noData: css`
    display: inline-flex;
    align-items: center;
    > :first-child {
      margin: 0 0.5rem;
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

  return (
    <TitleBodyLayout
      title='都道府県別人口グラフ'
      additionalStyles={css`
        margin-top: 1rem;
        padding: 2rem 1rem 0 1rem;
      `}
    >
      {isLoading && prefectures.length === 0 ? (
        <Loading />
      ) : prefectures.length === 0 ? (
        <div css={styles.noData}>
          <HiOutlineExclamationTriangle size={20} />
          <p>都道府県を選択してください</p>
        </div>
      ) : (
        <div css={styles.container}>
          <RadioButtons
            name='population'
            items={[...statisticsItems]}
            checked={checked}
            onChange={onChange}
            additionalStyles={css`
              margin-bottom: 1rem;
            `}
          />
          <MultiLineChart
            input={multiLineInputData}
            xAliasUnit='年'
            yAliasUnit='人'
            yAliasWidth={75}
            yAliasTickFormatter={(tick: number) => tick.toLocaleString()}
          />
        </div>
      )}
    </TitleBodyLayout>
  );
};
