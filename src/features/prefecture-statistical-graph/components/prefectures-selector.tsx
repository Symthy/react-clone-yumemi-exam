import { useEffect } from 'react';
import { css } from '@emotion/react';
import { Loading } from 'src/components/elements/loading';
import { TitleBodyLayout } from 'src/components/layouts/title-body-layout';
import { SelectionArea } from 'src/components/templates/selection-area/selection-area';
import { makeAttrForTest } from 'src/fixture/attributeBuilder';
import { Prefecture, PrefectureResponeseResult } from 'src/types';
import { usePrefecturesQuery } from '../api/usePrefecturesQuery';
import { convertToSelectableItems } from '../hooks/converter';

type PrefecturesSelectorProps = {
  prefectures: Prefecture[];
  updateSelectedPrefecture: (id: string, isSelected: boolean) => void;
  savePrefectures: (prefecturesResponse: PrefectureResponeseResult[] | undefined) => void;
};

export const PrefecturesSelector = ({
  prefectures,
  updateSelectedPrefecture,
  savePrefectures
}: PrefecturesSelectorProps) => {
  const { isLoading, prefectureResponseResult } = usePrefecturesQuery();

  const perfNamesKey = prefectureResponseResult?.map((result) => result.prefName).join('');
  useEffect(() => {
    savePrefectures(prefectureResponseResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perfNamesKey]);

  return (
    <TitleBodyLayout
      title='都道府県一覧'
      existsBorder
      additionalStyles={css`
        padding: 2rem 1.6rem 0 1.6rem;
      `}
      {...makeAttrForTest('pref-list-title')}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <SelectionArea
          selectableItems={convertToSelectableItems(prefectures)}
          updateSelectedPrefecture={updateSelectedPrefecture}
        />
      )}
    </TitleBodyLayout>
  );
};
