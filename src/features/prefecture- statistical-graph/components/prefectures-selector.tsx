import { useEffect } from 'react';
import { css } from '@emotion/react';
import { Loading } from 'src/components/templates/loading';
import { SelectionArea } from 'src/components/templates/selection-area/selection-area';
import { TitleBodyLayout } from 'src/components/templates/title-body-layout';
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
