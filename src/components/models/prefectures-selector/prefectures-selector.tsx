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
