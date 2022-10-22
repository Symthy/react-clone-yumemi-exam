import { UseQueryResult } from '@tanstack/react-query';
import { SelectionArea } from 'src/components/templates/selection-area/selection-area';
import { PrefectureResponeseResult } from 'src/types';
import { Prefecture } from './types';
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

  const {
    data: prefecturesResponse,
    isLoading,
    isError,
    error
  }: UseQueryResult<PrefectureResponeseResult[], Error> = usePrefecturesQuery();
  useSavePrefectures(prefecturesResponse, setPrefectures);

  // Todo
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <SelectionArea
      title='都道府県一覧'
      selectableItems={convertToSelectableItems(prefectures)}
      updateSelectedPrefecture={updateSelectedPrefecture}
    />
  );
};
