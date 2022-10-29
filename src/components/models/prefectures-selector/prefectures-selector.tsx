import { css } from '@emotion/react';
import { TitleBodyLayout } from 'src/components/elements/title-body-layout';
import { SelectionArea } from 'src/components/templates/selection-area/selection-area';
import { Prefecture } from 'src/types';
import { useConvertToSelectableItems } from './useConvertToSelectableItems';
import { usePrefecturesQuery } from './usePrefecturesQuery';
import { useSavePrefectures } from './useSavePrefectures';
import { useUpdateSelectedPrefecture } from './useUpdateSelectedPrefecture';

type PrefecturesSelectorProps = {
  prefectures: Prefecture[];
  setPrefectures: (prefectures: Prefecture[]) => void;
};

export const PrefecturesSelector = ({ prefectures, setPrefectures }: PrefecturesSelectorProps) => {
  const convertToSelectableItems = useConvertToSelectableItems();
  const updateSelectedPrefecture = useUpdateSelectedPrefecture(prefectures, setPrefectures);

  const { isLoading, prefectureResponseResult } = usePrefecturesQuery();
  useSavePrefectures(prefectureResponseResult, setPrefectures);

  return (
    <TitleBodyLayout
      title='都道府県一覧'
      existsBorder
      additionalStyles={css`
        padding: 2rem 1.6rem 0 1.6rem;
      `}
    >
      {isLoading ? (
        <p>Loading...</p> // Todo
      ) : (
        <SelectionArea
          selectableItems={convertToSelectableItems(prefectures)}
          updateSelectedPrefecture={updateSelectedPrefecture}
        />
      )}
    </TitleBodyLayout>
  );
};
