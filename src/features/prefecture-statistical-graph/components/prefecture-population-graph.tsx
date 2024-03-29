/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { css } from '@emotion/react';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';
import { Loading } from 'src/components/elements/loading';
import { RadioButtons, useRadioState } from 'src/components/elements/radio-buttons';
import { TitleBodyLayout } from 'src/components/layouts/title-body-layout';
import { MultiLineChart } from 'src/components/templates/multi-line-chart';
import { useMakeAttrForTest } from 'src/fixture/useMakeAttrForTest';
import { commonStyles } from 'src/styles';
import { Prefecture } from 'src/types';
import { usePopulationsQueries } from '../api/usePopulationsQueries';
import { convertToMultiLineInput as convertToMultiLineInputData } from '../hooks/converter';
import { usePopulationDatasetsState } from '../hooks/usePopulationDatasetsState';

type PrefecturePopulationGraphProps = {
  prefectures: Prefecture[];
};

const styles = {
  container: css`
    ${commonStyles.flexColumnDefault}
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
  const makeAttrForTest = useMakeAttrForTest();
  const { perfectureToPopulationDataSets, statisticsItems, savePopulationDatasets } = usePopulationDatasetsState();
  const { isLoading, prefectureToPopulationResponseResults } = usePopulationsQueries(prefectures);
  const { selectedItem, checked, onChange } = useRadioState('総人口');

  const perfNamesKey = prefectureToPopulationResponseResults.map((pref) => pref.prefName).join('');
  useEffect(() => {
    savePopulationDatasets(prefectureToPopulationResponseResults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perfNamesKey, savePopulationDatasets]);

  return (
    <TitleBodyLayout
      title='都道府県別人口グラフ'
      additionalStyles={css`
        margin-top: 1rem;
        padding: 2rem 1rem 0 1rem;
      `}
      {...makeAttrForTest('pop-graph-title')}
    >
      {prefectures.length === 0 ? (
        <div css={styles.noData}>
          <HiOutlineExclamationTriangle size={20} />
          <p {...makeAttrForTest('pop-no-selected-label')}>都道府県を選択してください</p>
        </div>
      ) : isLoading && prefectures.length === 1 ? (
        <Loading />
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
            input={convertToMultiLineInputData(selectedItem, perfectureToPopulationDataSets)}
            xAliasUnit='年'
            yAliasUnit='人'
            yAliasWidth={80}
            yAliasTickFormatter={(tick: number) => tick.toLocaleString()}
          />
        </div>
      )}
    </TitleBodyLayout>
  );
};
